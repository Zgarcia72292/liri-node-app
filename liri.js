require("dotenv").config();

//this variable accesses and saves axios//
var axios = require("axios");

var keys = require("./keys.js");
// var spotifyID = keys.spotify;
// var mySong = function (songSearch){
var Spotify = require('node-spotify-api');
//     if (songSearch === undefined){
//         songSearch = "the sign ace of base";
//     }

// }


var spotify = new Spotify(keys.spotify);

// var spotify = new Spotify({
//     id: "0b812eb369ed4e71bad852e731ee14d5",
//     secret: "11a6a552590647abbe368d7b49290c5b"
//   });

//The following function checks for any errors within the search data. For example,
//if the rotten tomatoes data is missing, like with the movie 'descendants', instead
//of crashing with an error, the function will return "nothing found" for the missing property. 

function errorCheck(text, fieldName, value) {

     if (fieldName === undefined) {
       
        console.log(text, "Nothing found!");
   
    }
   
    else {
       
        console.log(text, fieldName[value]);
    
    }

}

//This is the variable that I will insert into the IMDB and BandsInTown API's.
//The '.slice(3)' will remove the 'node', 'liri.js', and 'movie-this/concert-this'
//from the command prompt string at postions 0, 1, and 2, repsectively. Now the code
//only picks up the key search words the user inputs afterward.
//.join(" ") will remove the spaces in between search words if there are any.// 

var search = process.argv.slice(3).join(" ");

//The following code uses axios to access the IMDB API and pull up the specified data//
axios.get(`http://www.omdbapi.com/?t=${search}&y=&plot=short&apikey=trilogy`).then(
    function (response) {

        // if (err){
        //     console.log("Cannot find movie");
        // }

        if (process.argv[2] === "movie-this") {

            //If process.argv[3] is undefined, or there is no search, mr. nobody will be the search by default// 

            if (process.argv[3] === undefined) {

                search = "mr.nobody";

                axios.get(`http://www.omdbapi.com/?t=${search}&y=&plot=short&apikey=trilogy`).then(
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
                        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                        console.log("It's on Netflix!");

                    })

            }

            else {

                errorCheck("Movie Title: ", response.data, "Title");
                errorCheck("Year Released: ", response.data, "Year");
                errorCheck("Rating: ", response.data, "Rated");
                errorCheck("Rotten Tomatoes Rating: ", response.data.Ratings[1], "Value");
                errorCheck("Country Produced: ", response.data, "Country");
                errorCheck("Original Language(s): ", response.data, "Language");
                errorCheck("Plot: ", response.data, "Plot");
                errorCheck("Actors: ", response.data, "Actors");
                console.log("--------------------------------------");

            }

        }

    });



//This code does the same as the code above, except a for-loop is needed to iterate through all of the upcoming//
//tour dates, unlike the movie API that only pulls up a single unique result.
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

// if (process.argv[2] === "spotify-this-song"){
   
//     spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//         if (err) {
//           return console.log('Error occurred: ');
//         }
       
//       console.log(data); 
//       });
// }