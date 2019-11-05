var searchText1 = $(".searchText1")
var searchText2 = $(".searchText2")
var weatherIcon1 = $("#weatherIcon1");
var weatherIcon2 = $("#weatherIcon2");


// This is our API key
var APIKey = "b617b7ae5bf5ab122b3261fcb3bec20d";

// Here we are building the URL we need to query the database

// var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + searchText1 + "&units=imperial&appid=" + APIKey;

// var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?q=" + searchText2 + "&units=imperial&appid=" + APIKey;

//Hard coded city for placeholder
var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + "Phoenix" + "&units=imperial&appid=" + APIKey;

var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?q=" + "Seattle" + "&units=imperial&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL1,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function (response) {

    // Log the queryURL
    console.log(queryURL1);

    // Log the resulting object
    console.log(response);

    weatherIcon1.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

    // Transfer content to HTML
    $(".city1").html("<h1>" + response.name + " Weather Details</h1>");
    $(".humidity1").text("Humidity: " + response.main.humidity);
    $(".temp1").text("Temperature (F): " + response.main.temp);
    // $(".lat").text("Latitude: " + response.coord.lat);
    // $(".lon").text("Longitude: " + response.coord.lon);


    // Log the data in the console as well
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);
    console.log("Latitude: " + response.coord.lat);
    console.log("Longitude: " + response.coord.lon);
  });


// Here we run our second AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL2,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function (response) {

    // Log the queryURL
    console.log(queryURL2);

    // Log the resulting object
    console.log(response);

    weatherIcon2.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

    // Transfer content to HTML
    $(".city2").html("<h1>" + response.name + " Weather Details</h1>");
    $(".humidity2").text("Humidity: " + response.main.humidity);
    $(".temp2").text("Temperature (F): " + response.main.temp);
    // $(".lat").text("Latitude: " + response.coord.lat);
    // $(".lon").text("Longitude: " + response.coord.lon);


    // Log the data in the console as well
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);
    console.log("Latitude: " + response.coord.lat);
    console.log("Longitude: " + response.coord.lon);
  });

  