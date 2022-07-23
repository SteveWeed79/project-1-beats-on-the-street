var bandAPI = ("rest.bandsintown.com?");
var apiKey = ("");
var bandName = ("");
var venuneName = ("");
var eventDate = ("");





function bandInfo() {
    fetch(bandAPI)
        .then(response => response.json())
        .then(data => console.log(data));
}