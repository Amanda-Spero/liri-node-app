//console.log("liri.js is loaded");

// read and set any environment variables with the dotenv package
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var command = process.argv[2];
var nodeArgs = process.argv;
//console.log(command);


//put together all parts of user input
var input = "";
for (var i = 3; i < nodeArgs.length; i++) {

  // Build a string with the input.
  input = input + " " + nodeArgs[i];

}
console.log(input);


//////////////////////TWITTER///////////////////////////////

var Twitter = require("twitter");
var client = new Twitter(keys.twitter);
var params = {screen_name: "@TestyMcTest919", count: 20};

if (command === "my-tweets") {   
 
client.get("statuses/user_timeline", "utf8", function(error, tweet, response) {
  if(error) throw error;
 
  for (i=0; i < tweet.length; i++) {
    console.log(tweet[i].text);   
  
    fs.appendFile("log.txt", "\n" + "Command: " + command+"\n" + "Screen Name: @TestyMcTest919"+"\n" + "Tweets: " + tweet[i].text+"\n" + "*******************************************************************" + "\n", function(err){
      if(err){
          console.log(err);
      } 
 
    }
    )
    }}
    )}
   


////////////////////SPOTIFY/////////////////////////

var Spotify = require("node-spotify-api");
var spotifyApi = new Spotify(keys.spotify);
var rp = require("request-promise");

 
if (command === "spotify-this-song"){

spotifyApi.search({type: "track", query: input, limit: 1 },function(err, data){

  if (err) {
    return console.log('Error occurred: ' + err);
  }

console.log(data); 

 
// .then(function(data) {
//     console.log("*************************");
//     console.log(data.body);

    fs.appendFile("log.txt", "\n" + "Command: " + command+"\n" + "Song: " + input + "Spotify Song Information: " + data.body + "\n" + "*******************************************************************" + "\n", function(err){
      if(err){
          console.log(err);
      } else {
          console.log("Content appended!");
      }
    });
  });
};
//   });
// })
// };


//////DO WHAT IT SAYS COMMAND///////////


if (command === "do-what-it-says") {

fs.readFile("random.txt", "utf8", function(error, data) {
  if (error) {
    return console.log(error)
  }
  
  var dataArr = data.split(",");

  spotifyApi.search({query: dataArr[1], type: "track", limit: 1 }) 
    .then(function(data) {
      console.log(dataArr[1]);
      console.log("*************************");
      console.log(data.body); 

      fs.appendFile("log.txt", "\n" + "Command: " + command+"\n" + "Song: " + dataArr[1] + "Spotify Song Information: " + data.body + "\n" + "*******************************************************************" + "\n", function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Content appended!");
        }
      });
      });
    });
  };  
    
///////////////OMDB///////////////////
var omdb = require("omdb");
var request = require("request");

if (command === "movie-this"){
  if(input < 1) {
    input = "Mr. Nobody";
}

request.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&tomatoes=true&apikey=trilogy", "utf8", function (error, response, body) {


  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

  console.log(input);
  console.log("**********************************************");
  console.log("Title: " + JSON.parse(body).Title);
  console.log("**********************************************");
  console.log("Release year: " + JSON.parse(body).Year);
  console.log("**********************************************");
  console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
  console.log("**********************************************");
  console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
  console.log("**********************************************");
  console.log("Produced in: " + JSON.parse(body).Country);
  console.log("**********************************************");
  console.log("Language: " + JSON.parse(body).Language);
  console.log("**********************************************");
  console.log("Plot: " + JSON.parse(body).Plot);
  console.log("**********************************************");
  console.log("Actors: " + JSON.parse(body).Actors);
  console.log("**********************************************");

/////////////////////APPEND TEXT INTO THE LOG.TXT FILE///////////////////

  fs.appendFile("log.txt", "\n" + "Command: " + command+"\n" + "Input: " + input+"\n" + "Title: " + JSON.parse(body).Title+"\n" + "Year Released: " + JSON.parse(body).Year+"\n" + "IMDB Rating: " + JSON.parse(body).imdbRating+"\n" + "Rotten Tomato Rating: " + JSON.parse(body).tomatoRating+"\n" + "Country of Release: " + JSON.parse(body).Country+"\n" + "Language: " + JSON.parse(body).Language+"\n" + "Plot: " + JSON.parse(body).Plot+"\n" + "Actors: " + JSON.parse(body).Actors+"\n" + "*******************************************************************" + "\n", function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Content appended!");
    }
  });
  });
}




