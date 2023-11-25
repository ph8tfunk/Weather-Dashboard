const api_key = "5715a2e70d43f5204093386ab1b8f071";

var searchInput = $('#search-input');

$('#search-button').on('click', function(event){
    event.preventDefault();
    var search = searchInput.val();
    getGeolocation(search);
});

function getGeolocation(city){

    
    var geo_URL = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+api_key;

    fetch(geo_URL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })

 }





