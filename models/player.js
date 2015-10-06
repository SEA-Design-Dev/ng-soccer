// Load required packages
var mongoose = require("mongoose");

// Define our teams schema
var PlayerSchema = new mongoose.Schema({
  name: String,
  team: String,
  number: Number,
  position: String,
});

// Export the Mongoose model
module.exports = mongoose.model("Player", PlayerSchema);
