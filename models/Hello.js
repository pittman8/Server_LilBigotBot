// here we define a schema for our document database
// mongo does not need this, but using mongoose and requiring a 
// schema will enforce consistency in all our documents (records)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HelloSchema = new Schema({
	  _id: {
    type: String,
    required: false
  },
  value: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Hello", HelloSchema);
