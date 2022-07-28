const apiUrl = "https://api.seatgeek.com/2/events?venue.city=";
const apiKey = "&q=music&type=concert&per_page=5&client_id=MjgwNDk1MDJ8MTY1ODc5NDk5My4zMDk5NDA2";
var data;
var typedLocation;
var seatGeekApi;

var savedCities = JSON.parse(localStorage.getItem("savedCitiesBand")) || [];

// ^^^ TWO NAME CITIES NEED A HYPHEN like new york is New-York or Kansas-City ^^^^
let eventData;

var events = [];

document.getElementById("btn-search").addEventListener("click", async function (event) {
    event.preventDefault()
    typedLocation = document.getElementById("typed-location").value;
    savedCities.push(typedLocation);
    localStorage.setItem("savedCitiesBand", JSON.stringify(savedCities));
    typedLocation = typedLocation.replace(/\s/i, "-");
    await getCityData();
    displayEventData();


});


async function getCityData() {
    if (typedLocation != "") {
        seatGeekApi = apiUrl + typedLocation + apiKey;
        var response = await fetch(seatGeekApi)
            .then((response) => response.json());
        events = [];
        for (i = 0; i < response.events.length; i++) {
            var venueName = response.events[i].venue.name;
            var eventName = response.events[i].short_title;
            var eventAddress = response.events[i].venue.address + response.events[i].venue.extended_address;
            var eventDate = response.events[i].datetime_utc;
            var eventTime = response.events[i].datetime_local;
            var eventUrl = response.events[i].url;
            var eventImg = response.events[i].performers[0].image;
            eventData = {
                venueName,
                eventName,
                eventAddress,
                eventDate,
                eventTime,
                eventUrl,
                eventImg
            };
            events.push(eventData);

        }
        loadSearches();
        console.log(events)



    };
};


// function displayEventData() {
//     getCityData()
//     console.log(eventData.eventName)
// }




function displayEventData() {
    var number = 0;
    var htmlEvents = document.querySelectorAll("[data-event]")
    events.forEach(event => {
        var htmlEvent = htmlEvents[number++];
        if (htmlEvent != undefined) {
            var eventTitle = htmlEvent.querySelector(".event-name");
            var venueTitle = htmlEvent.querySelector(".venue-name");
            var addressTitle = htmlEvent.querySelector(".event-address");
            var dateTitle = htmlEvent.querySelector(".event-date");
            var urlTitle = htmlEvent.querySelector(".event-url");
            var imgTitle = htmlEvent.querySelector(".event-img");
            var eventTime = htmlEvent.querySelector(".event-time")
            eventTitle.innerHTML = event.eventName;
            venueTitle.innerHTML = event.venueName;
            addressTitle.innerHTML = event.eventAddress;
            eventTime.innerHTML = event.eventTime;
            dateTitle.innerHTML = event.eventDate;
            urlTitle.href = event.eventUrl;
            imgTitle.src = event.eventImg;
        }
    });
};

function loadSearches() {
    var ul = document.getElementById("previous-searches");
    ul.innerHTML = ""
    savedCities.forEach(city => {
        var li = document.createElement("li");
        var text = document.createTextNode(city)
        li.appendChild(text);
        ul.appendChild(li);
        li.addEventListener("click", event => clickPreviousSearch(event))
    });
};

async function clickPreviousSearch(event) {
    typedLocation = event.target.innerHTML;
    typedLocation = typedLocation.replace(/\s/i, "-");
    await getCityData();
    displayEventData();
};



loadSearches();