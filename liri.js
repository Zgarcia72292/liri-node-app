require("dotenv").config();

//this variable accesses and saves axios//
var axios = require("axios");

// var keys = require("keys.js");

// var spotify = new Spotify(keys.spotify);
// function concert (){
//     if (process.argv[1] === "concert-this"){

//     }
// }

//this is the variable that I will insert into the IMDB and BandsInTown API's
//the 'slice(3)' will remove the 'node', 'liri.js', and 'movie-this/concert-this'
//from the command prompt string at postions 0, 1, and 2, repsectively, so the code
//only picks up the key search words the user inputs afterward.// 
var search = process.argv.slice(3).join(" ");

//The following code uses axios to access the IMDB API and pull up the specified data//
axios.get(`http://www.omdbapi.com/?t=${search}&y=&plot=short&apikey=trilogy`).then(
    function (response) {

        if (process.argv[2] === "movie-this") {
          
            console.log("Movie Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Year);
            console.log("Rating: " + response.data.Rated);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced: " + response.data.Country);
            console.log("Original Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("--------------------------------------");


        }
    });


//This code does the same as the code above, except a for-loop is needed to iterate through all of the upcoming//
//tour dates, unlike the movie API that only pulls up a single unique result
//Also the 'upcoming' at the end of the URL string is a parameter that will only pull
//JSON data for upcoming events. This parameter could be set to 'all' or any specified
//date range//
axios.get(`https://rest.bandsintown.com/artists/${search}/events?app_id=codingbootcamp&date=upcoming`).then(
    function (response) {
        if (process.argv[2] === "concert-this") {
           
            for (var i = 0; i < response.data.length; i++) {
               
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue City: " + response.data[i].venue.city);
                console.log("Concert Date: " + response.data[i].datetime);
                console.log("------------------------------------------");
           
            }
        }
    });

