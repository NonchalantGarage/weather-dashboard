// Study API data - Temp, Wind, Humidity, UV
// .main.temp convert to imperial
// .wind.speed
// .main.humidity

// get geocode by lon lat
// https://developers.google.com/maps/documentation/geocoding/overview#GeocodingRequests
// https://openweathermap.org/current#name
// https://openweathermap.org/api/one-call-api

// pass citysearch to ID, then use One Call API for all the data 

var saveHistory = []

var today = dayjs().format('MM/DD/YYYY');


var todayForecast = function (increment) {
    return dayjs().add(increment,'day').format('MM/DD/YYYY');

}

console.log(todayForecast(1));
var historyEl =document.querySelector("#search-history");
var formEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-search");   
var currentCityEl = document.querySelector("#current-results");


// FETCH FORECAST DATA
var getForecastData = function(city){

    apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=8bafed382c7c1d380aab6b5abd6f355a&units=imperial"
    fetch(apiUrl)
        .then(function(response){
        response.json()
            .then(function(data){
            displayForecast(data)
        });
    });
}
// DISPLAY FORECAST CARDS
 var displayForecast = function(forecastData) {



    var forecastContainerEl = document.querySelector("#forecast-cards");
    forecastContainerEl.textContent = ""

        for (i=0; i < 5; i++){
            var forecastCardEl = document.createElement("div")
            forecastContainerEl.appendChild(forecastCardEl);
            var forecastListEl = document.createElement("ul");
            forecastCardEl.appendChild(forecastListEl);

            var iconImg = "http://openweathermap.org/img/w/" + forecastData.list[i].weather[0].icon + ".png";
            var imgEl = document.createElement("img");
            imgEl.setAttribute("src", iconImg);
            forecastListEl.appendChild(imgEl)

            var dateEl = document.createElement("h6");
            dateEl.textContent = todayForecast(i + 1);
            forecastListEl.appendChild(dateEl)
            
            
            var tempEl = document.createElement("li");
            tempEl.textContent = "Temp: " + forecastData.list[i].main.temp + " F";
            forecastListEl.appendChild(tempEl)
        
            
            var windEl = document.createElement("li");
            windEl.textContent = "Wind: " + forecastData.list[i].wind.speed + " MPH";
            forecastListEl.appendChild(windEl);
            
            var humidityEl = document.createElement("li")
            humidityEl.textContent = "Humidity: " + forecastData.list[i].main.humidity + " %";
            forecastListEl.appendChild(humidityEl)

        }
 }   


// FETCH WEATHER DATA 
var getWeatherData = function(city){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8bafed382c7c1d380aab6b5abd6f355a&units=imperial";
    fetch(apiUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                saveHistory.push(city);
                localStorage.setItem("cityName", JSON.stringify(saveHistory));
                displayCurrentCity(data, city);

                var lon = data.coord.lon;
                var lat = data.coord.lat;
                var name = data.name
                var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+ "&lon=" +lon+"&appid=8bafed382c7c1d380aab6b5abd6f355a";
                fetch(oneCallUrl)
                .then(function(response){
                    if (response.ok){
                        response.json().then(function(data){
                            displayUV(data,city);            
                        })
                    }
                })    



                
            });
        } else {    
            alert("City not found")
        }
    });

};

// DISPLAY CURRENT CITY DATA
var displayCurrentCity = function(weatherData, citySearch){
    currentCityEl.textContent = "";

    

    var cityEl = document.createElement("h4");
    cityEl.textContent = citySearch + " "+ today + "";
    currentCityEl.appendChild(cityEl);

    var imgLink = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png";
    
    var imgEl = document.createElement("img");
    imgEl.setAttribute("src",imgLink);
    currentCityEl.appendChild(imgEl)


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

    
    // displaySearchHistory(citySearch)
}
var displayUV = function(uvData){
    var uvEl = document.createElement("span")
    uvEl.textContent = "UV: " + uvData.current.uvi;
    currentCityEl.appendChild(uvEl);
    if (uvData.current.uvi < 2 ){
        uvEl.setAttribute("class", "green lighten-3")
    } else if (uvData.current.uvi < 2 && uvData.current.uvi <=5){
        uvEl.setAttribute("class", "yellow lighten-3")
    } else {
        uvEl.setAttribute("class", "red lighten-3")
    }
}

// DISPLAY SEARCH HISTORY
var displaySearchHistory = function(searchName){
    var searchHistoryContainerEl = document.querySelector("#search-history");
    var historyListEl = document.createElement("ul");
    searchHistoryContainerEl.appendChild(historyListEl);
    var historySearchEl = document.createElement("button");
    historySearchEl.setAttribute("class", "history-btn")
    historySearchEl.textContent = searchName;
    historyListEl.appendChild(historySearchEl);
}

// display name function, date and  weather in today's weather container 

// add event handler for city search 
var citySearchHandler = function(event){

    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName){    
        getWeatherData(cityName);
        getForecastData(cityName);
        displaySearchHistory(cityName)
        cityInputEl.value =""
    } else {
        alert("Please enter a valid city")
    }
}


var historyHandler =function(event){
    event.preventDefault();

    if (event.target.matches(".history-btn")){
    var historyName = event.target.innerHTML
    getWeatherData(historyName);
    getForecastData(historyName);

    }

}

var loadHistory = function(){
    saveHistory = JSON.parse(localStorage.getItem("cityName")) || []

    for (i=0; i<saveHistory.length; i++){
        displaySearchHistory(saveHistory[i]);
    }
}

historyEl.addEventListener("click", historyHandler);
formEl.addEventListener("submit", citySearchHandler);

loadHistory();