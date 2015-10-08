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

// Create the Express router
var router = express.Router();

// Use the body-parser package in our application
app.use(bodyParser.json());

// Root route
router.get("/", function (req, res) {
  res.sendFile(__dirname + "/src/app/index.html");
});


// All assets
router.get("/assets/*", function (req, res) {
  path = req.path.replace(/^\/assets/,'');
  if (path.match(/node_modules/)) {
    res.sendFile(__dirname + path);
  } else {
    res.sendFile(__dirname + "/public/" + path);
  }
});

// Register the router with the application
app.use("/", router);

// Create a new route with prefix /players
var playersRoute = router.route("/api/players");





// READ

// Create endpoint /api/players for POST
playersRoute.post(function (req, res) {
  // Create a new instance of the Player model
  var player = new Player();

  // Set the player properties that came from the POST data
  player.name = req.body.name;
  player.team = req.body.team;
  player.number = req.body.number;
  player.postion = req.body.position;

  // Save the player and check for errors
  player.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.json(player);
  });
});


// Create endpoint /api/players for GET
playersRoute.get(function(req, res) {
  // Use the Player model to find all players
  Player.find(function (err, players) {
    if (err) {
      res.send(err);
    }

    res.json(players);
  });
});





// CREATE

// Create a new route for /players/:player_id
var playerRoute = router.route("/api/players/:player_id");


// Create endpoint for /api/players/:playerID
playerRoute.get(function(req, res) {
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
playerRoute.put(function(req, res) {
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
playerRoute.delete(function (req, res) {
  // Use the player model to find a specific player and remove it
  Player.findByIdAndRemove(req.params.player_id, function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ message: "Successfully removed player." });
  });
});





app.listen(port);
