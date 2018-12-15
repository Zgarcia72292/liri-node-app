# liri-node-app

Welcome to my LIRI node application!

This app can search through 3 API's
    - The "Open Movie Database" API, or OMDB, to search for information about movies.
    - The "Bands In Town" API, to search for upcoming shows by artist.
    - The "Spotify" API, to search for artist, track, or record information by song. 

How to use it:

The app will operate entirely off of user input from the command line. LIRI uses a total of 4 functions!

1.) movie-this
2.) concert-this
3.) spotify-this-song 
4.) do-what-it-says

To tell LIRI what to do, format your input as such, "node liri.js *function* *query*"

For example if I wanted to search information about the movie, "Lion King", this is how to tell LIRI.

"node liri.js movie-this lion king"

Essentially, "node liri.js" will be the same and will be required before every command. 

Thats all there is to it, enjoy. 