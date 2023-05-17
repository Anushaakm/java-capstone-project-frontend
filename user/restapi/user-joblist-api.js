function setupTable() {
    const table = document.getElementById('tableJob')

    apiFetchAllJobs(table)
}

setupTable()


function propulateActualData(table, jobposts) {

    for(const job of jobposts) {

        const { id, jobTitle, location, industry } = job
        
        const viewPageUrl = `./JobSeeker-view.html?id=${id}`
        const applyPageUrl =`./apply-job.html?id=${id}`


        const row = table.insertRow()
        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = jobTitle
        row.insertCell(2).innerHTML = location
        row.insertCell(3).innerHTML = industry
        row.insertCell(4).innerHTML = `
            <a href='${viewPageUrl}'>View</a>
            <a class='ms-2' href='${applyPageUrl}'>Apply</a> 
             
        `
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