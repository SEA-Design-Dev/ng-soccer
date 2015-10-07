// Load required packages
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Player = require("./models/player");

// Connect to the database
mongoose.connect("mongodb://localhost/soccr");

// Create the Express application
var app = express();

// Use environment defined port or 4242
var port = process.env.PORT || 4242;

// Create the Express router
var baseRouter = express.Router();
var apiRouter = express.Router();

// configure ilvereload
app.use(require('connect-livereload')({port: 4002}));

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Dummy route
baseRouter.get("/", function (req, res) {
  res.sendFile(__dirname + "/src/app/index.html");
});

baseRouter.get("/assets/*", function (req, res) {
  path = req.path.replace(/^\/assets/,'');
  if (path.match(/node_modules/)) {
    res.sendFile(__dirname + path);
  } else {
    res.sendFile(__dirname + "/public/" + path);
  }
});

// Register all our routes with /api
app.use("/api", apiRouter);
app.use("/", baseRouter);

// Create a new route with prefix /players
var playersRoute = apiRouter.route("/players");





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

    res.json({ message: "Player successfully saved.", data: player});
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
var playerRoute = apiRouter.route("/players/:player_id");


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
    player.number = req.body.number;

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
