// global variables to use in code

var youtubeAPIKey = "AIzaSyBW17GJncf3PfULnlRXh0kIrceTtpfHKIs";
youtubeApiURL = "https://www.googleapis.com/youtube/v3";
var youtubeSrch =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBW17GJncf3PfULnlRXh0kIrceTtpfHKIs";
var searchInput = document.getElementsByClassName(".form-control");
var searchBtn = document.getElementById("#searchBtn");
// Need to add the on click function when the search button is clicked.
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if ((searchInput = " ")) {
    // can add a popout maybe that will say "Please enter an Artist Name/Band/Song"
  }

  var userSearch = searchInput.value;
  console.log(userSearch);
  //   also need to get the value of the input inside the form so I can use that in the API
});

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
