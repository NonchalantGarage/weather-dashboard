// Study API data - Temp, Wind, Humidity, UV
// .main.temp convert to imperial
// .wind.speed
// .main.humidity

// get geocode by lon lat
// https://developers.google.com/maps/documentation/geocoding/overview#GeocodingRequests
// https://openweathermap.org/current#name
// https://openweathermap.org/api/one-call-api

// pass citysearch to ID, then use One Call API for all the data 

var formEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-search");   


// setup fetch api city data 

var getWeatherData = function(city){

    // format the api URL
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8bafed382c7c1d380aab6b5abd6f355a";
    fetch(apiUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
            });
        } else {    
            alert("City not found")
        }
    });

};



// display name function, date and  weather in today's weather container 
// append most recent search to search history list container 

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