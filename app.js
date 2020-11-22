//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

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
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

// creating schema for articles collection so I can make models
const articleSchema = {
  title: String,
  content: String
};

// articles model
const Article = mongoose.model("Article", articleSchema);

///////////////////////////////////Requests Targetting all Articles////////////////////////

app.route("/articles")

// get all articles (on localhost:3000/articles)
.get(function(req, res){
  Article.find(function(err, foundArticles){
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
})

// post request for localhost:3000/articles (adding article via postman)
.post(function(req, res){
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err){
    if (!err){
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
})

// deletes all articles in database
.delete(function(req, res){

  Article.deleteMany(function(err){
    if (!err){
      res.send("Successfully deleted all articles.");
    } else {
      res.send(err);
    }
  });
});

////////////////////////////////Requests Targetting A Specific Article////////////////////////

app.route("/articles/:articleTitle")

.get(function(req, res){

  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
    if (foundArticle) {
      res.send(foundArticle);
    } else {
      res.send("No articles matching that title was found.");
    }
  });
})

.put(function(req, res){

  Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err){
      if(!err){
        res.send("Successfully updated the selected article.");
      }
    }
  );
})

.patch(function(req, res){

  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successfully updated article.");
      } else {
        res.send(err);
      }
    }
  );
})

.delete(function(req, res){

  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err){
      if (!err){
        res.send("Successfully deleted the corresponding article.");
      } else {
        res.send(err);
      }
    }
  );
});


// sets app to listen on port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
