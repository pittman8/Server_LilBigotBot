// here we define a schema for our document database
// mongo does not need this, but using mongoose and requiring a 
// schema will enforce consistency in all our documents (records)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatSchema = new Schema({
  _id: {
    type: String,
    required: false
  },
  Connections: {
    type: Number,
    required: true
  },
  Slurs: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Stats", StatSchema);