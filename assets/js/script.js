// Study API data - Temp, Wind, Humidity, UV

// setup fetch api data 
// add event handler for city search 

var getWeatherData = function(){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=8bafed382c7c1d380aab6b5abd6f355a";
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


var submitBtnEl = document.querySelector(".btn")


// display name function, date and  weather in today's weather container 
// append most recent search to search history list container 

// var citySearchHanlder = function(event){
//     event.preventDefault();

// }


// submitBtnEl.addEventListener("submit", citySearchHandler)