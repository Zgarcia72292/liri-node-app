require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var userSearch = process.argv.slice(3).join(" ");
//This is the variable that I will insert into the IMDB and BandsInTown API's.
//The '.slice(3)' will remove the 'node', 'liri.js', and 'movie-this/concert-this'
//from the command prompt string at postions 0, 1, and 2, repsectively. Now the code
//only picks up the key search words the user inputs afterward.
//.join(" ") will remove the spaces in between search words if there are any.// 
var userFunction = process.argv[2];

function movieThis() {
    //This code writes the user input into the log.txt file//
    fs.appendFile("log.txt", userFunction + " " + userSearch, function(err) {
        if (err) throw err;
     });
    var url = `http://www.omdbapi.com/?t=${userSearch}&y=&plot=short&apikey=trilogy`;
//The following code uses axios to access the IMDB API and pull up the specified data//
    axios.get(url).then(
        function (response) {
            console.log("Movie Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Year);
            console.log("Rating: " + response.data.Rated);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced: " + response.data.Country);
            console.log("Original Language(s): " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("--------------------------------------");

        }
    )
}

function concertThis() {
    fs.appendFile("log.txt", userFunction + " " + userSearch, function(err) {
        if (err) throw err;
     });
    //This code does the same as the code above, except a for-loop is needed to iterate through all of the upcoming//
//tour dates, unlike the movie API that only pulls up a single unique result.
//Also the 'upcoming' at the end of the URL string is a parameter that will only pull
//JSON data for upcoming events. This parameter could be set to 'all' or any specified
//date range//
    var url = `https://rest.bandsintown.com/artists/${userSearch}/events?app_id=codingbootcamp&date=upcoming`;
    axios.get(url).then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {

                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue City: " + response.data[i].venue.city);
                console.log("Concert Date: " + response.data[i].datetime);
                console.log("------------------------------------------");

            }
        }
    )
}

function mySpotify() {
    fs.appendFile("log.txt", userFunction +" "+ userSearch, function(err) {
        if (err) throw err;
     });
    //this function simply takes user input and puts it into the spotify api//
    spotify.search({ type: 'track', query: userSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("----------------------------");
        
    })
   }

function doWhatItSays(){

    //this function pulls from the random.txt file, splitting up the items by commas, and runs the item throuh the spotify API//
    fs.readFile("random.txt", "utf8", function (err, data){

        if (err){
            return console.log(err);
        }
     let randomArray = data.split(",");

     spotify.search({ type: 'track', query: randomArray[1] }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("----------------------------");
        
    })


    })
}

//The switch function makes it simple to check a userFunction and run the applicable function// 

switch (userFunction){
    case "movie-this":
      //If process.argv[3] is undefined, or there is no search, mr. nobody will be the search by default// 
    if (!userSearch){
        userSearch = "mr.nobody";
        movieThis();
    }
    else{
    movieThis();
    };
    break;
    case "concert-this":
    concertThis();
    break;
    case "spotify-this-song":
    if (!userSearch){
        userSearch = "The Sign Ace of Base";
        mySpotify()
    }
    else{
        mySpotify()
    };
    break;
    case "do-what-it-says":
    doWhatItSays()
    break;

}
