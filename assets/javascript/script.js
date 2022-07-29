
var youtubeAPIKey = "AIzaSyBW17GJncf3PfULnlRXh0kIrceTtpfHKIs";

GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=AIzaSyBW17GJncf3PfULnlRXh0kIrceTtpfHKIs HTTP/1.1

var eventData
var data;
var typedLocation = "detroit";
var apiUrl = "https://api.seatgeek.com/2/events?venue.city=";
var apiKey = "&q=music&type=concert&per_page=5&client_id=MjgwNDk1MDJ8MTY1ODc5NDk5My4zMDk5NDA2"
var seatGeekApi = apiUrl + typedLocation + apiKey;
var ticketMaster = "https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&classificationName=music&city=Dallas"
var cityNameEL;
var ticketMasterList;


// ^^^ TWO NAME CITIES NEED A HYPHEN like new york is New-York or Kansas-City ^^^^
//var typedCityField = document.getElementById("btn-search").addEventListener("click", function (event) {
   // event.preventDefault()
//});


async function getCityData() {
    var eventData = await fetch(seatGeekApi)
        .then((response) => response.json())
        .then((data) => (data));


    var venueName = eventData.events[0].venue.name;
    var eventName = eventData.events[0].short_title;
    var eventAddress = eventData.events[0].venue.address + " " + eventData.events[0].venue.extended_address;
    var eventDate = eventData.events[0].datatime_utc;
    var eventTime = eventData.events[0].datatime_local;
    var eventUrl = eventData.events[0].url;
    var eventImg = eventData.events[0].performers[0].image;
    console.log(eventAddress);
};

function getTicketmaster() {
    fetch(ticketMaster)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            ticketMasterList = data;
            console.log(ticketMasterList)
            cityNameEL = ticketMaster._embedded[0].events[0].name
            console.log(cityNameEL)
        })
    
        
}


getCityData(typedLocation);

