var APIKey = "d4f5fe65fadf7116d2456da067a274f2";
var listBoxEl = document.getElementById("cityList");
var cityInputEl = document.getElementById("citySearch")
var searchButtonEl = document.getElementById("searchButton")
var city;
var latitude;
var longitude;

var getLocation = function (city) {

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

  fetch(queryURL).then(function (response) {
    //convert to JSON object // 
    if (response.ok) {
      response.json().then(function (data) {
        //extract latitude and longitude to use in a second APIfetch
        latitude = data.coord.lat;
        longitude = data.coord.lon;
        console.log(latitude, longitude);
      })
    } else {
      alert("city not found");
    }
  })
    .catch(function (error) {
      //in case there is an error
      console.log(error);
    })
};

var getWeather = function () {
  var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + APIKey;
  fetch(weatherURL).then(function (response) {
    if (response.ok) {
      console.log(response);
    } else {
      alert("invalid city")
    }
  })
  .catch(function(error){
    console.log(error);
  })
}



var displayWeather = function (conditionsFromWeatherURL) {
  // get conditions temperature, humidity, windspeed, UV index
  // display cityname, date and conditions...with icon
  // color code UV index (favorable/green, moderate/yellow, severe/red)
  // get 5-day forcast
};

var addCity = function (cityName) {
  var newCity = document.createElement("button");
  newCity.textContent = cityName;
  listBoxEl.appendChild(newCity);
  // save list to local storage
}

var submitHandler = function (event) {
  event.preventDefault();
  var cityName = cityInputEl.value.trim();
  if (cityName) {
    getLocation(cityName);
    addCity(cityName);
    cityName = "";
    getWeather();
  } else {
    alert("Please enter a valid city name");
  };
};


//getWeather("forest lake");

searchButtonEl.addEventListener("click", submitHandler);
// listBoxEl.addEventListener("click", getWeather);