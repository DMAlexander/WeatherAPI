getAllData();

// Dynamically creating all.html. The function needs to be declared an async function in order to use await response. 
async function getAllData() {
    // Get all saved weather data from the database
    const response = await fetch('/weather');
    const data = await response.json();

    for(item of data) {

        const tempSend = document.createElement('div');
        const tempLowSend = document.createElement('div');
        const tempHighSend = document.createElement('div');
        const windSpeedSend = document.createElement('div');
        const commentsend = document.createElement('div');
        const divider = document.createElement('div');
        const root = document.createElement('div');
                    
        var a = document.createElement('a');
        var linkText = document.createTextNode(item.id);
        a.appendChild(linkText);
        a.title = "Item Information";
        a.href = "http://localhost:3000/item.html?id=" + item.id + "&comment=" + item.comment
        document.body.appendChild(a);

        a.textContent = 'Row id: ' + item.id;
        commentsend.textContent = 'User Comment: ' + item.comment;
        tempSend.textContent = 'Current Temperature: ' + item.temp;
        tempLowSend.textContent = 'Todays Low: ' + item.templow;
        tempHighSend.textContent = 'Todays High: ' + item.temphigh;
        windSpeedSend.textContent = 'Wind Speed: ' + item.windspeed
        divider.textContent = '-------------------------------';

        root.append(a, tempSend, tempLowSend, tempHighSend, windSpeedSend, commentsend, divider);
        root.append(' ');
        document.body.append(root);
                    
        }
                
    console.log(data);
}
