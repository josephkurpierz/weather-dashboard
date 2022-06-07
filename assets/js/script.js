var APIKey = "d4f5fe65fadf7116d2456da067a274f2";
var listBoxEl = document.getElementById("cityList");
var cityInputEl = document.getElementById("citySearch")
var searchButtonEl = document.getElementById("searchButton")
var city;

var getWeather = function (city) {

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  // PAID SERVICE?? var weeklyURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=5&appid=" + APIKey;

  fetch(queryURL).then(function (response) {
    //convert to JSON object // 
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        //extract latitude and longitude to use in a second APIfetch
      })
    } else {
      alert("city not found");
    }
  })
    //   //Display in HTMl here
    //   var docArray = data.response.docs;
    //   for (var i = 0; i < docArray.length; i++) {
    //     var listItem = document.createElement("li");
    //     listItem.textContent = docArray[i].description;
    //     listEl.appendChild(listItem);
    //   }
    // })
    .catch(function (error) {
      //in case there is an error
      console.log(error);
    })
};

var displayWeather = function(conditions) {
// get conditions temperature, humidity, windspeed, UV index
// display cityname, date and conditions...with icon
// color code UV index (favorable/green, moderate/yellow, severe/red)
// get 5-day forcast
};

var addCity = function(cityName){
  var newCity = document.createElement("button");
  newCity.textContent = cityName;
  listBoxEl.appendChild(newCity);
  // save list to local storage
}

var submitHandler = function (event) {
  event.preventDefault();
  var cityName = cityInputEl.value.trim();
  if (cityName) {
    getWeather(cityName);
    addCity(cityName);
    cityName = "";
  } else {
    alert("Please enter a valid city name");
  };
};


//getWeather("forest lake");

searchButtonEl.addEventListener("click", submitHandler);
// listBoxEl.addEventListener("click", getWeather);