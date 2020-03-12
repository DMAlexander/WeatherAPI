getItemData();
// Dynamically creating the Item Information page
async function getItemData() {
                
    //Getting id parameter...
    const params = new 
    URLSearchParams(window.location.search)
    var id = params.get('id');
    //Get weather data from the database from an id
    const response = await fetch('/weather/' + id);
    const data = await response.json();

    const root = document.createElement('div');
    const tempSend = document.createElement('div');
    const tempLowSend = document.createElement('div');
    const tempHighSend = document.createElement('div');
    const windSpeedSend = document.createElement('div');
    const idSend = document.createElement('div');

    var newdiv = document.createElement('div');
    newdiv.setAttribute('style', 'page-break-after:always');

    tempSend.textContent = 'Current Temperature: ' + data.temp;

    tempLowSend.textContent = 'Todays Low: ' + data.templow;
    tempHighSend.textContent = 'Todays High: ' + data.temphigh;
    windSpeedSend.textContent = 'Wind Speed: ' + data.windspeed;
    idSend.textContent = 'Row id: ' + data.id;
    idSend.setAttribute("hidden", true);

    var input = document.createElement('input');
    var commentText = document.createTextNode(data.comment);
    input.appendChild(commentText);
    input.id = 'comment';
    input.value = data.comment;     

    var updateButton = document.createElement('button');
    var updateButtonText = document.createTextNode("Update Comment");
    updateButton.appendChild(updateButtonText);
    updateButton.id = 'updateComment';
    updateButton.value = 'update';

    var deleteButton = document.createElement('button');
    var deleteButtonText = document.createTextNode("Delete row");
    deleteButton.appendChild(deleteButtonText);
    deleteButton.id = 'deleteRow';
    deleteButton.value = 'delete';
 
    root.append(tempSend, tempLowSend, tempHighSend, windSpeedSend, idSend, newdiv, input, updateButton, deleteButton);
    root.append(' ');
    document.body.append(root);
                    
}

//Update comment and 
document.addEventListener('click', async function(e) {
    if(e.target && e.target.id == 'updateComment'){
                    
    const params = new 
    URLSearchParams(window.location.search)
    var id = params.get('id');
    var initialComment = params.get('comment');
    var comment = document.getElementById('comment').value
    document.getElementById('updateSuccess').style.display = "block";

    const data = { id, initialComment, comment }
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
    body: JSON.stringify(data)
    }

    const response = await fetch('/weather/' + id + '/' + comment, options);
    const json = await response.json();
    console.log(json);
    alert('Weather data comment has been updated.');
    }
});

// Delete item information and redirect back to the All Items page when delete has been completed.
document.addEventListener('click', async function(e) {
    if(e.target && e.target.id == 'deleteRow'){

    //Getting id parameter...
    const params = new
    URLSearchParams(window.location.search)
    var id = params.get('id');

    const data = { id }
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    body: JSON.stringify(data)
    }

    const response = await fetch('weather/' + id, options);
    const json = await response.json();
    console.log(json);
    alert('Weather data item has been deleted.');
    window.location.href='http://localhost:3000/all.html';
    }
});