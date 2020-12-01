const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/KnowledgeDB", {useNewUrlParser: true}, { useUnifiedTopology: true });

const infoSchema = {
  tag1: String,
  tag2: String,
  topic: String,
  from: String,
  content: String
}

const Info = mongoose.model("Bit", infoSchema);

app.route("/info")

.get(function(req, res){
  Info.find(function(err, info){
    if (!err) {
      res.send(info);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res){

  const newInfo = new Info({
    tag1: req.body.tag1,
    tag2: req.body.tag2,
    topic: req.body.topic,
    from: req.body.from,
    content: req.body.content
  })

  newInfo.save(function(err){
    if (!err){
      res.send("Added new information!");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res){

  Info.deleteMany(function(err){
    if (!err){
      res.send("Deleted all information.");
    } else {
      res.send(err);
    }
  });
});


app.route("/info/:tag1")

.get(function(req, res){

  Info.find({tag1: req.params.tag1}, function(err, tag1){
    if (tag1) {
      res.send(tag1);
    } else {
      res.send("No information");
    }
  });
})

.put(function(req, res){

  Info.update(
    {tag1: req.params.tag1},
    {tag1: req.body.tag1,
    tag2: req.body.tag2,
    topic: req.body.topic,
    from: req.body.from,
    content: req.body.content},
    {overwrite: true},
    function(err){
      if(!err){
        res.send("Updated information!");
      }
    }
  );
})

.patch(function(req, res){

  Info.update(
    {tag1: req.params.tag1},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Updated information!");
      } else {
        res.send(err);
      }
    }
  );
})

.delete(function(req, res){

  Info.deleteOne(
    {tag1: req.params.tag1},
    function(err){
      if (!err){
        res.send("Deleted information!");
      } else {
        res.send(err);
      }
    }
  );
});

app.route("/info/:tag1/:tag2")

.get(function(req, res){

  Info.find({tag1: req.params.tag1,
             tag2: req.params.tag2},
             function(err, tag1){
    if (tag1) {
      res.send(tag1);
    } else {
      res.send("No information");
    }
  });
})

.delete(function(req, res){

  Info.deleteOne(
    {tag1: req.params.tag1,
     tag2: req.params.tag2},
    function(err){
      if (!err){
        res.send("Deleted information!");
      } else {
        res.send(err);
      }
    }
  );
});

app.route("/info/:tag1/:tag2/:topic")

.get(function(req, res){

  Info.find({tag1: req.params.tag1,
             tag2: req.params.tag2,
             topic: req.params.topic},
             function(err, tag1){
    if (tag1) {
      res.send(tag1);
    } else {
      res.send("No information");
    }
  });
})

.delete(function(req, res){

  Info.deleteOne(
    {tag1: req.params.tag1,
     tag2: req.params.tag2,
     topic: req.params.topic}, 
    function(err){
      if (!err){
        res.send("Deleted information!");
      } else {
        res.send(err);
      }
    }
  );
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
