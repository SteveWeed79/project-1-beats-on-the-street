//Script.js
const searchButton = document.getElementById("searchBtn");
const input = document.getElementById("searchInput");
const modal = document.getElementById("myModal");

// Add the event listner for click events on the search box
searchButton.addEventListener("click", (event) => {
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
  const youtubeSrch = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBW17GJncf3PfULnlRXh0kIrceTtpfHKIs&q=${artistName}`;
  const response = await fetch(youtubeSrch);
  const body = await response.json();

  document.getElementById(`youtube-${artistName}`).innerHTML += `
            <div class="img1">
              <img src="${body.items[0].snippet.thumbnails.medium.url}" alt="thumbnail-1" />
            </div>
            <div class="main-text place-content-center">
              <h2>${body.items[0].snippet.channelTitle}</h2>
              <iframe width="420" height="345" src="https://www.youtube.com/embed/${items.id.videoId}">
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
