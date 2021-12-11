// Study API data - Temp, Wind, Humidity, UV
// .main.temp convert to imperial
// .wind.speed
// .main.humidity

// get geocode by lon lat
// https://developers.google.com/maps/documentation/geocoding/overview#GeocodingRequests
// https://openweathermap.org/current#name
// https://openweathermap.org/api/one-call-api

// pass citysearch to ID, then use One Call API for all the data 

var today = dayjs().format('DD/MM/YYYY');
var formEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-search");   
var currentCityEl = document.querySelector("#current-results");


// setup fetch api city data 
var getForecastData = function(city){

    apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=8bafed382c7c1d380aab6b5abd6f355a&unites=imperial"
    fetch(apiUrl)
        .then(function(response){
        response.json()
            .then(function(data){
            displayForecast(data)
        });
    });
}




 var displayForecast = function(forecastData, date) {
    for (i=0; i < 5; i++){
        
    }
 }   



var getWeatherData = function(city){

    // format the api URL
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8bafed382c7c1d380aab6b5abd6f355a&units=imperial";
    fetch(apiUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                displayCurrentCity(data, city);
            });
        } else {    
            alert("City not found")
        }
    });

};

var displayCurrentCity = function(weatherData, citySearch){
    currentCityEl.textContent = "";

    var cityEl = document.createElement("h4");
    cityEl.textContent = citySearch + " "+ today + " ";

    currentCityEl.appendChild(cityEl);

    // create UL to append li for each weather attribute 

    var listAttributeEl = document.createElement("ul")
    currentCityEl.appendChild(listAttributeEl)

    var tempEl = document.createElement("li");
    tempEl.textContent = "Temp: " + weatherData.main.temp + " F";
    listAttributeEl.appendChild(tempEl)

    
    var windEl = document.createElement("li");
    windEl.textContent = "Wind: " + weatherData.wind.speed + " MPH";
    listAttributeEl.appendChild(windEl);
    
    var humidityEl = document.createElement("li")
    humidityEl.textContent = "Humidity: " + weatherData.main.humidity + " %";
    listAttributeEl.appendChild(humidityEl)

    var uvEl = document.createElement("li")
}


// display name function, date and  weather in today's weather container 

// add event handler for city search 
var citySearchHandler = function(event){

    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName){    
        getWeatherData(cityName);
        cityInputEl.value =""
    } else {
        alert("Please enter a valid city")
    }
}


formEl.addEventListener("submit", citySearchHandler)