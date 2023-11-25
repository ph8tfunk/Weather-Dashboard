const api_key = "5715a2e70d43f5204093386ab1b8f071";

var searchInput = $('#search-input');
var listGroup = $('#history');
var listElm = $('<ul>');


var latitude;
var longitude;

$('#search-button').on('click', function(event){
    event.preventDefault();
    var search = searchInput.val();
    getGeolocation(search);
    searchHistory(search);
});

function getGeolocation(city){

    
    var geo_URL = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+api_key;

    fetch(geo_URL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            longitude = data[0].lon;
            latitude = data[0].lat;
            getForecast(longitude,longitude);
        })

 }

function getForecast(lon, lat){

    var forecast_URL = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+api_key;

    fetch(forecast_URL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log("Temp: " + data.list[0].main.temp);
            console.log("wind: " + data.list[0].wind.speed);
            console.log("Humidity: " + data.list[0].main.humidity);
        })

}

function searchHistory(city){

    var listItem = $('<li>')
    var btn = $('<button>').text(city);
    listItem.append(btn);
    listElm.append(listItem);
    listGroup.append(listElm);

}


