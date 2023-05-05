function setupTable() {
    const table = document.getElementById('tableJob')

    apiFetchAllJobs(table)
}

setupTable()


function propulateActualData(table, jobposts) {

    for(const job of jobposts) {

        const { id, jobTitle, location, industry } = job
        const updatePageUrl = `./update-job.html?id=${id}`
        const viewPageUrl = `./view-job.html?id=${id}`

        const row = table.insertRow()
        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = jobTitle
        row.insertCell(2).innerHTML = location
        row.insertCell(3).innerHTML = industry
        row.insertCell(4).innerHTML = `
            <a href='${viewPageUrl}'>View</a> 
            <a class='ms-2' href='${updatePageUrl}'>Update</a> 
            <a class='ms-2' onclick='showConfirmDeleteModal(${id})'>Delete</a> 
        `
    }
}

function showConfirmDeleteModal(id) {
    console.log('clicked ' + id)
    const myModalEl = document.getElementById('deleteModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()

    const btDl = document.getElementById('btDl')
    btDl.onclick = () => {
        apiCallDeleteJob(id, modal)
    }
}

function apiFetchAllJobs(table) {
    axios.get('http://localhost:8080/jobpost/')
        .then(res => {
            const { data } = res
            console.log(data)  
            const { sts, msg, bd } = data

            propulateActualData(table, bd)
        })
        .catch(err => console.log(err))
}

function apiCallDeleteJob(id, modal) {
    const url = `http://localhost:8080/jobpost/${id}`

    axios.delete(url)
        .then(res => res.data) // you converted complete response in to our business reponse
        // .then( data => console.log(data.msg) ) // this line can be written in destructured form as below
        .then( ({ sts, msg, bd }) =>  modal.hide() )
        .catch(console.log)
}