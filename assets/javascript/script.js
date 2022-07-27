var eventData;
var data;
var typedLocation;
var apiUrl = "https://api.seatgeek.com/2/events?venue.city=";
var apiKey = "&q=music&type=concert&per_page=5&client_id=MjgwNDk1MDJ8MTY1ODc5NDk5My4zMDk5NDA2";
var seatGeekApi;
// ^^^ TWO NAME CITIES NEED A HYPHEN like new york is New-York or Kansas-City ^^^^
var typedCityField = document.getElementById("btn-search").addEventListener("click", function (event) {
    event.preventDefault()
    typedLocation = document.getElementById("typed-location").value;
    typedLocation = typedLocation.replace(/\s/i, "-");
    getCityData()
});


async function getCityData() {
    if (typedLocation != "") {
        seatGeekApi = apiUrl + typedLocation + apiKey;
        var eventData = await fetch(seatGeekApi)
            .then((response) => response.json());
        var venueName = eventData.events[0].venue.name;
        var eventName = eventData.events[0].short_title;
        var eventAddress = eventData.events[0].venue.address + " " + eventData.events[0].venue.extended_address;
        var eventDate = eventData.events[0].datatime_utc;
        var eventTime = eventData.events[0].datatime_local;
        var eventUrl = eventData.events[0].url;
        var eventImg = eventData.events[0].performers[0].image;
        console.log(eventImg)
    }

};


function displayEventData() {
    getCityData()
}




function displayEventData(eventInfo) {
    var number = 0;
    var htmlEvents = document.querySelectorAll("[event]")
    eventInfo.forEach(event => {
        var htmlEvent = htmlEvents[number++];
        if (htmlEvent != undefined) {
            var eventTitle = htmlEvent.querySelector(".event-name");
            var venueTitle = htmlEvent.querySelector(".venue-name");
            var addressTitle = htmlEvent.querySelector(".event-address");
            var dateTitle = htmlEvent.querySelector(".event-date");
            var urlTitle = htmlEvent.querySelector(".event-url");
            var imgTitle = htmlEvent.querySelector(".event-img");
            eventTitle.innerHTML = event.eventName;
            venueTitle.innerHTML = event.eventName;
            addressTitle.innerHTML = event.eventName;
            dateTitle.innerHTML = event.eventName;
            urlTitle.innerHTML = event.eventName;
            imgTitle.innerHTML = event.eventName;



        }
    });
};


function getEventsFromCityName(typedLocation) {

}