//Script.js
const searchButton = document.getElementById("searchBtn");
const input = document.getElementById("searchInput");
const modal = document.getElementById("myModal");

// Add the event listner for click events on the search box
searchButton.addEventListener("click", (event) => {
  document.getElementById("music-event").innerHTML = "";


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


// global variables to use in code


var youtubeAPIKey = "AIzaSyBW17GJncf3PfULnlRXh0kIrceTtpfHKIs";


var youtubeAPIKey = "AIzaSyBW17GJncf3PfULnlRXh0kIrceTtpfHKIs";
youtubeApiURL = "https://www.googleapis.com/youtube/v3";
var youtubeSrch =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBW17GJncf3PfULnlRXh0kIrceTtpfHKIs";
var searchInput = document.getElementsByClassName(".form-control");
var searchBtn = document.getElementById("#searchBtn");
// Need to add the on click function when the search button is clicked.
searchBtn.addEventListener("click", function (event) {

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
  const youtubeSrch = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBW17GJncf3PfULnlRXh0kIrceTtpfHKIs&q=${artistName}`;
  const response = await fetch(youtubeSrch);
  const body = await response.json();

  document.getElementById(`youtube-${artistName}`).innerHTML += `
            <div class="img1">
              <img src="${body.items[0].snippet.thumbnails.medium.url}" alt="thumbnail-1" />
            </div>
            <div class="main-text place-content-center">
              <h2>${body.items[0].snippet.channelTitle}</h2>
              <iframe width="420" height="345" src="https://www.youtube.com/embed/${body.items[0].id.videoId}">
            </div>`;
}

// Search the Seat Geek API for events by city
// Calls the youtube method for each artist in each event
async function searchGeekApi(searchTerm) {
  const seatGeekApi = `https://api.seatgeek.com/2/events?venue.city=${searchTerm}&q=music&type=concert&per_page=5&client_id=MjgwNDk1MDJ8MTY1ODc5NDk5My4zMDk5NDA2`;
  const response = await fetch(seatGeekApi);
  const body = await response.json();
  body.events.map((event) => {
    document.getElementById("music-event").innerHTML += `
    <div class="card p-6">
    <div class="card-body">
    <h5 class="card-title">${event.short_title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${event.venue.name}</h6>
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
}

var eventData
var data;
var typedLocation;
var apiUrl = "https://api.seatgeek.com/2/events?venue.city=";
var apiKey = "&q=music&type=concert&per_page=5&client_id=MjgwNDk1MDJ8MTY1ODc5NDk5My4zMDk5NDA2"
var seatGeekApi = apiUrl + typedLocation + apiKey;
var ticketMaster = "https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&classificationName=music&city="
var cityNameTicketsmaster;
var ticketMasterList = [];


// ^^^ TWO NAME CITIES NEED A HYPHEN like new york is New-York or Kansas-City ^^^^
//var typedCityField = document.getElementById("btn-search").addEventListener("click", function (event) {
   // event.preventDefault()
//});




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
    fetch(ticketMaster + typedLocation)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            ticketMasterList = data;
            console.log(ticketMasterList)
            cityNameTickets = ticketMasterList._embedded.events[0].name
            console.log(cityNameTickets)
        })   
};




loadSearches();

getCityData(typedLocation);


// this fetches the youtubeAPI to get the search results YAY!
// function getvideos() {
//   fetch(youtubeSrch)
//     .then((results) => {
//       return results.json();
//     })
//     .then((data) => {
//       console.log(data);
//     });
// }
// getvideos();


