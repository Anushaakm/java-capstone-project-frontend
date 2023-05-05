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
    row.insertCell(3).innerHTML = industry 
    row.insertCell(3).innerHTML = qualification 
    row.insertCell(3).innerHTML = applicationRequirement 
    row.insertCell(3).innerHTML = postedDate 
}

apiGetJobDetails()