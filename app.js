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

// setting up mongoDB
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

// creating schema for articles collection so I can make models 
const articlesSchema = {
  title: String,
  content: String
};

// articles model
const Article = mongoose.model("Article", articlesSchema);

// get all articles (on localhost:3000/articles)
app.get("/articles", function(req, res){
  Article.find(function(err, foundArticles){
    if (!err) {
    res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

// post request for localhost:3000/articles (adding article via postman)
app.post("/articles", function(req, res){ 
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(function(err){
    if (!err){
      res.send("Successfully added a new article");
    } else {
      res.send(err);
    }
  });
});


// sets app to listen on port 3000
app.listen(3000, function(){
  console.log("Server running on port 3000");
});