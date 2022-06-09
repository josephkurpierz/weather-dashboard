var APIKey = "d4f5fe65fadf7116d2456da067a274f2";
var listBoxEl = document.getElementById("cityList");
var cityInputEl = document.getElementById("citySearch")
var searchButtonEl = document.getElementById("searchButton")
var displayBoxEl = document.getElementById("display");
var forecastBoxEl = document.getElementById("forecast");
var city;

var getLocation = function (city) {

  var queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;

  fetch(queryURL).then(function (response) {
    if (response.ok) {
      //convert to JSON object // 
      response.json().then(function (data) {
        //extract city name, latitude and longitude to use in a second APIfetch
        var latitude;
        var longitude;
        var savedCityName;
        latitude = data[0].lat;
        longitude = data[0].lon;
        savedCityName = data[0].name;
        var location = { latitude, longitude, savedCityName };
        getWeather(location);
        console.log("location", location);
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

var currentWeather = function (city, current) {
  //saving pertinent weather parameters to variables
  var temperature = current.temp;
  var humidity = current.humidity;
  var UVIndex = current.uvi;
  var windspeed = current.wind_speed;
  var weatherIcon = current.weather[0].icon;
  
  console.log("temperature",temperature);
  // create card to append to html
  var currentCard = document.createElement("card");
  currentCard.innerHTML="<h2>"+city+"</h2><p>temperature:"+ temperature+"</p>";
  //set classes and such
  displayBoxEl.appendChild(currentCard);
}

var forecastWeather = function (forecast) {
  //loop through data"forecast.length
}

var renderWeather = function (city, data) {
  currentWeather(city, data.current);
  forecastWeather(data.daily);
}

var getWeather = function (location) {
  // run second API with location from first API to get weather data
  var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIKey}`;
  fetch(weatherURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        renderWeather(location.savedCityName, data);

        //render current function

        //get current weather data
        // data.current.temp
        // data.current.humidity
        // data.current.uvi
        // data.current.wind_speed
        //data.current.weather[0].icon
        console.log("temp=", data.current.temp);
        console.log("uvindex=", data.current.uvi);
        console.log("icon", data.current.weather[0].icon);
        // loop through data.daily[] for 5 day from 1-5
        // data.daily[i].humidity
        // data.daily[i].temp.day
        // data.daily[i].uvi
        // data.daily[i].wind_speed
        // data.daily[i].weather[0].icon
        console.log("tomorrows temp=", data.daily[1].temp.day);
        console.log("tomorrows windspeed=", data.daily[1].wind_speed);
        console.log("tomorrows icon=", data.daily[1].weather[0].icon);

      })
    } else {
      alert("invalid city")
    }
  })
    .catch(function (error) {
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
    //clear input box...not working
    cityInputEl.textContent = "";
  } else {
    alert("Please enter a valid city name");
  };
};




searchButtonEl.addEventListener("click", submitHandler);
// listBoxEl.addEventListener("click", getWeather);