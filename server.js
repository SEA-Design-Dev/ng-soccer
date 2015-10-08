// Load required packages
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Player = require("./models/player");

// Connect to the database
mongoose.connect("mongodb://localhost/soccr"); // name can be whatever you need it to be

// Create the Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Use the body-parser package in our application
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

// READ

// Create endpoint /api/players for POST
app.post("/api/players", function (req, res) {
  // Create a new instance of the Player model
  var player = new Player();

  // Set the player properties that came from the POST data
  player.name = req.body.name;
  player.team = req.body.team;
  player.number = req.body.number;
  player.position = req.body.position;

  // Save the player and check for errors
  player.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.json(player);
  });
});


// Create endpoint /api/players for GET
app.get("/api/players", function(req, res) {
  // Use the Player model to find all players
  Player.find(function (err, players) {
    if (err) {
      res.send(err);
    }

    res.json(players);
  });
});





// CREATE

// Create endpoint for /api/players/:playerID
app.get("/api/players/:player_id", function(req, res) {
  // Use the player model to find a specific player
  Player.findById(req.params.player_id, function (err, player) {
    if (err) {
      res.send(err);
    }

    res.json(player);
  });
});


// UPDATE

// Change the player's number
app.put("/api/players/:player_id", function(req, res) {
  // Use the Player model to find a specific player
  Player.findById(req.params.player_id, function (err, player) {
    if (err) {
      res.send(err);
    }

    // Update the player's number
    player.name = req.body.name;
    player.team = req.body.team;
    player.number = req.body.number;
    player.position = req.body.position;

    // Save the player and check for errors
    player.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.json(player);
    });
  });
});


// DELETE

// Create endpoint /api/players/:player_id for DELETE
app.delete("/api/players/:player_id", function (req, res) {
  // Use the player model to find a specific player and remove it
  Player.findByIdAndRemove(req.params.player_id, function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ message: "Successfully removed player." });
  });
});




// Load node_modules; not needed once something like webpack is getting used
app.get('/node_modules/*', function(req, res) {
  res.sendFile(__dirname + req.path);
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + "/public/views/index.html"); // load our public/views/index.html file
});


app.listen(port);
