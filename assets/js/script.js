const api_key = "5715a2e70d43f5204093386ab1b8f071";

var searchInput = $('#search-input');
var listGroup = $('#history');
var listElm = $('<ul>');
var forcastPanel = $('#forecast');

var todayForecast = $('#today');
var today;
var fiveDays = [];
var todayDate = dayjs().format('DD/MM/YYYY');


var latitude;
var longitude;

$('#search-button').on('click', function(event){
    event.preventDefault();
    var search = searchInput.val();
        if (search != ""){
        getGeolocation(search);
        searchHistory(search);
    }
});

function getGeolocation(city){

    
    var geo_URL = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+api_key;

    fetch(geo_URL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            longitude = data[0].lon;
            latitude = data[0].lat;
            getForecast(longitude,latitude);
        })

 }

function getForecast(lon, lat){

    var forecast_URL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+api_key+"&units=metric";

    fetch(forecast_URL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            today = {
                city: data.city.name,
                temp: data.list[0].main.temp,
                wind: data.list[0].wind.speed,
                humidity: data.list[0].main.humidity,
                icon: data.list[0].weather[0].icon
            }

            for ( i = 4; i< data.list.length; i+=8) {
            //5 days with 3 hours changes

            nextday = {
                temp: data.list[i].main.temp,
                wind: data.list[i].wind.speed,
                humidity: data.list[i].main.humidity,
                icon: data.list[i].weather[0].icon
            }

            fiveDays.push(nextday);
            }
            forcastToday(today);
            fivedayForecast();
        })

}

function searchHistory(city){

    var listItem = $('<li>')
    var btn = $('<button>').text(city);
    listItem.append(btn);
    listElm.append(listItem);
    listGroup.append(listElm);

}

function forcastToday(today){

    //todayForecast.clear();
    //var todayForecast = $('#today');
    var headerElm = $("<h2>").text(today.city + " (" +todayDate + ")");
    var iconElm = $('<img>').attr('src',"https://openweathermap.org/img/wn/" + today.icon+ "@2x.png");
    headerElm.append(iconElm);
    todayForecast.append(headerElm);
    var temp = $("<p>").text("Temp: " + today.temp + "°C");
    var wind = $("<p>").text("Wind: " + today.wind + "m/s");
    var humidity = $("<p>").text("Humidity: " + today.humidity + "%");
    todayForecast.append(temp,wind,humidity);
}

function fivedayForecast(){

    var title = $("<h3>").text("5-Day Forecast:")
    forcastPanel.append(title);
    console.log(fiveDays);
    for (let i = 0; i < fiveDays.length; i++) {
            
        var card = $("<div>").attr('class',"card style=width: 18rem;");
        var cardbody = $("<div>").attr('class',"card-body");

        var pElm = $("<p>").text(todayDate);
        var iconElm = $('<img>').attr('src',"https://openweathermap.org/img/wn/" + fiveDays[i].icon+ ".png");
        cardbody.append(pElm);
        cardbody.append(iconElm);
        
        var temp = $("<p>").text("Temp: " + fiveDays[i].temp + "°C");
        var wind = $("<p>").text("Wind: " + fiveDays[i].wind + "m/s");
        var humidity = $("<p>").text("Humidity: " + fiveDays[i].humidity + "%");
        cardbody.append(temp,wind,humidity);
    
        card.append(cardbody);
    forcastPanel.append(card);
    }

}