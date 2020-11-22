// required modules
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");

// new instance of express app
const app = express();

// setting view to use ejs templates
app.set('view engine', 'ejs');

// using body parser to parse requests
app.use(bodyParser.urlencoded({
  extended: true
}));
// using the public folder to store static files eg: images etc
app.use(express.static("public"));




// sets app to listen on port 3000
app.listen(3000, function(){
  console.log("Server running on port 3000");
});