//Searching weather data of a city when 'Search City' Button is selected
document.getElementById('cityButton').addEventListener('click', async event  => {
    var city = document.getElementById('city').value
    var state = document.getElementById('state').value
    console.log(city);
    console.log(state);

    const api_url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + state + '&appid=6e37b7da9b424749ca5711fe1a148b5a&units=imperial'
    const response = await fetch(api_url);
    const json = await response.json();

    document.getElementById('temperature').textContent = json.main.temp + ' °F'
    document.getElementById('tempLow').textContent = json.main.temp_min + ' °F'
    document.getElementById('tempHigh').textContent = json.main.temp_max + ' °F'
    document.getElementById('windSpeed').textContent = json.wind.speed + ' MPH'

    document.getElementById('saveData').style.display = "block";
    document.getElementById('comment').style.display = "block";
    document.getElementById('todaysWeather').style.display = "block";

    document.getElementById('temperatureLabel').style.display = "block";
    document.getElementById('temperature').style.display = "block";
    document.getElementById('tempLowLabel').style.display = "block";
    document.getElementById('tempLow').style.display = "block";
    document.getElementById('tempHighLabel').style.display = "block";
    document.getElementById('tempHigh').style.display = "block";
    document.getElementById('windSpeedLabel').style.display = "block";
    document.getElementById('windSpeed').style.display = "block";
    
    console.log(json);
});

//Saves weather data into the database
document.getElementById('saveData').addEventListener('click', async event  => {

    var temp =   document.getElementById('temperature').textContent
    var tempLow = document.getElementById('tempLow').textContent
    var tempHigh = document.getElementById('tempHigh').textContent
    var windSpeed = document.getElementById('windSpeed').textContent
    var comment = document.getElementById('comment').value

    const data = { temp, tempLow, tempHigh, windSpeed, comment }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('weather/', options);
    const json = await response.json();
    console.log(json);
    alert('Weather data row has been inserted.');
});