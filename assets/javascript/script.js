var eventData
var data;
var typedLocation = "detroit";
var apiUrl = "https://api.seatgeek.com/2/events?venue.city=";
var apiKey = "&q=music&type=concert&per_page=5&client_id=MjgwNDk1MDJ8MTY1ODc5NDk5My4zMDk5NDA2"
var seatGeekApi = apiUrl + typedLocation + apiKey;

// ^^^ TWO NAME CITIES NEED A HYPHEN like new york is New-York or Kansas-City ^^^^
var typedCityField = document.getElementById("btn-search").addEventListener("click", function (event) {
    event.preventDefault()
});

async function getCityData() {
    var eventData = await fetch(seatGeekApi)
        .then((response) => response.json())
        .then((data) => (data));








    var venueName = eventData.events[0].venue.name;
    var eventName = eventData.events[0].short_title;
    var eventUrl = eventData.events[0].url;
    console.log(eventUrl);



};



getCityData(typedLocation);
