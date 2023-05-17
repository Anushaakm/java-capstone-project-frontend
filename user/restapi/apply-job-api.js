const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

function apiGetJobDetails() {
    const id = readIdQueryParam()

    axios.get(`http://localhost:8080/jobpost/${id}`)
        .then(httpReponse => httpReponse.data)
        .then(data => populateTableDetails(data.bd))
        .catch(err => console.log(err))
}



function populateTableDetails({ id, jobTitle, jobDescription, location, industry, qualification, applicationRequirement, postedDate }) {
    // populating invoice details inside a table
    const table = document.getElementById('tableDetails')
    const row = table.insertRow()
    row.insertCell(0).innerHTML = id
    row.insertCell(1).innerHTML = jobTitle
    row.insertCell(2).innerHTML = jobDescription
    row.insertCell(3).innerHTML = location
    row.insertCell(4).innerHTML = industry 
    row.insertCell(5).innerHTML = qualification 
    row.insertCell(6).innerHTML = applicationRequirement 
    row.insertCell(7).innerHTML = postedDate 
}
function setupForm() {
    const formEvent = document.getElementById('applicationdetails')
    console.log(formEvent)
    formEvent.onsubmit = ev => {
        ev.preventDefault()
        //  showSuccessModal()
    }
}

setupForm()
apiGetJobDetails()

function applyByUserId(){
    const userId =localStorage.getItem("userId");
    
    const jobPostId=readIdQueryParam()
    console.log(userId,jobPostId)

    const headers={
        'content-type': 'application/json'
    }
    axios.post('http://localhost:8080/user/${userId}/jobpost/${jobPostId}', {headers})

    .then(
        ()=>{showSuccessModal()}
    ).catch(
        err=>{
        showSuccessModal1()
        console.log(err)
    }

    )

}

function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}
function showSuccessModal1() {
    const myModalEl = document.getElementById('successModal1');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}