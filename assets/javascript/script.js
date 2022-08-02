const searchButton = document.getElementById("searchBtn");
const input = document.getElementById("searchInput");
const modal = document.getElementById("myModal");
const apiUrl = "https://api.seatgeek.com/2/events?venue.city=";
const apiKey = "&q=music&type=concert&per_page=5&client_id=MjgwNDk1MDJ8MTY1ODc5NDk5My4zMDk5NDA2";
var seatGeekApi = apiUrl + typedLocation + apiKey;
var typedLocation;
var savedCities = JSON.parse(localStorage.getItem("savedCitiesBand")) || [];
let eventData;
var events = [];
var ticketMaster = "https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&classificationName=music&city="
var ticketMax;
var ticketMin;
var ticketData = [];
var ticketRange;
var correctFormat;

document.getElementById("searchBtn").addEventListener("click", async function (event) {
    event.preventDefault()

    typedLocation = document.getElementById("searchInput").value;
    savedCities.unshift(typedLocation);
    savedCities = savedCities.slice(0, 5);
    localStorage.setItem("savedCitiesBand", JSON.stringify(savedCities));
    await getCityData();   
    displayEventData();
    console.log(savedCities);
});

searchButton.addEventListener("click", function (event) {
    document.getElementById("music-event").innerHTML = "";
    event.preventDefault();
    if (input.value) {
        searchGeekApi(input.value);
        return;
    }
    // If nothing is in the box pop the error modal
    modal.style.display = "block";
    console.log("search");
});

// Add a on click event to close the modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Helper function to create youtube content in the cards, takes an artist name and appends the search results
// To the artist name div

async function searchYouTube(artistName) {
    const youtubeSrch = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCAdTFXDxOuijbNr0DKHrmmCyqGYP5t-2Q&q=${artistName}`;
    const response = await fetch(youtubeSrch);
    const body = await response.json();

    console.log(artistName)
    document.getElementById(`youtube-${artistName}`).innerHTML += `
            <div class="img1">
              <img src="${body.items[0].snippet.thumbnails.medium.url}" alt="thumbnail-1" />
            </div>
            <div class="main-text embed-responsive embed-responsive-16by9 place-content-center">
              <h2>${body.items[0].snippet.channelTitle}</h2>
              <iframe width="250" height="345" src="https://www.youtube.com/embed/${body.items[0].id.videoId}">
            </div>`;
};

// Search the Seat Geek API for events by city
// Calls the youtube method for each artist in each event
async function searchGeekApi(searchTerm) {
    const seatGeekApi = `https://api.seatgeek.com/2/events?venue.city=${searchTerm}&q=music&type=concert&per_page=5&client_id=MjgwNDk1MDJ8MTY1ODc5NDk5My4zMDk5NDA2`;
    const response = await fetch(seatGeekApi);
    const body = await response.json();
    body.events.map(async(event) => {
        const ticketPrice = await getTicketData(event.short_title)
        console.log(ticketPrice)
        document.getElementById("music-event").innerHTML += `
    <div class="card p-6 col-6">
    <div class="card-body">
    <h5 class="card-title">${event.short_title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${event.venue.name}</h6>
    <h6 class="card-subtitle mb-2 text-muted"></h6>
    <h6 class="card-subtitle mb-2 text-muted"></h6>
    <h6>Event Address: <span class="event-address">${event.venue.address}</span></h6>
    <h6>Event Time: <span class="event-time">${correctFormat}</span></h6>
    <h6>Event Prices: From $ ${ticketPrice._embedded.events[0].priceRanges[0].min} to $ ${ticketPrice._embedded.events[0].priceRanges[0].max} </h6>
    ${event.performers
                .map((performer) => `<div id="youtube-${performer.name}"></div>`)
                .join("")}
    </div>
    </div>
      `;
    });
    body.events.forEach((e) =>
        e.performers.forEach((p) => searchYouTube(p.name))
    );
};




async function getCityData() {
    if (typedLocation != "") {
        seatGeekApi = apiUrl + typedLocation + apiKey;
        var response = await fetch(seatGeekApi)
            .then((response) => response.json());
        events = [];
        for (i = 0; i < response.events.length; i++) {
            var venueName = response.events[i].venue.name;
            eventName = response.events[i].short_title;
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
                eventImg,
            };
            events.push(eventData);
        }
        correctFormat = moment(eventTime).format("MMMM, Do, YYYY, h:mm A")
        console.log(correctFormat);
        loadSearches();
        getTicketData();
    };
};

function displayEventData() {
    var titleLocation = " in " + typedLocation;
    document.getElementById("city-name").textContent = titleLocation;
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
            var eventTime = htmlEvent.querySelector(".event-time");
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
    ul.innerHTML = "";
    savedCities.forEach(city => {
        var li = document.createElement("li");
        var text = document.createTextNode(city);
        li.appendChild(text);
        ul.appendChild(li);
        li.addEventListener("click", event => clickPreviousSearch(event))

    });
};

async function clickPreviousSearch(event) {
    typedLocation = event.target.innerHTML;
    // typedLocation = typedLocation.replace(/\s/i, "-");
    document.getElementById("music-event").innerHTML = "";
    await getCityData();
    displayEventData();
    searchYouTube(typedLocation);
    searchGeekApi(typedLocation);
};

async function getTicketData(artistName) {
    const response = await fetch(ticketMaster + typedLocation + '&keyword=' + artistName);
    const body = await response.json();
       return body; 
    };

loadSearches();
