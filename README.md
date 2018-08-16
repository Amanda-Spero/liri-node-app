# liri-node-app

LIRI NODE APP
===============
A Siri-like node application accessed through the command line that makes API calls to either Twitter, Spotify,or OMDB.

To pull up the last 20 (developer's) Tweets:
node liri.js my-tweets

To get information about a song: 
node liri.js spotify-this-song "<song name>"

To get information about a movie:
node liri.js movie-this "<movie name>"

To run the text inside of random.txt:
node liri.js do-what-it-says

Dependencies:
===============
dotenv
fs
node-spotify-api
omdb
request
request-promise
spotify-web-api-node
twitter