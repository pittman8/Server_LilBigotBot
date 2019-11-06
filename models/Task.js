// here we define a schema for our document database
// mongo does not need this, but using mongoose and requiring a 
// schema will enforce consistency in all our documents (records)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  _id: {
    type: String,
    required: false
  },
  taskName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now  // this line means we don't have to overtly set the time 
    // the task was created, it will be set as we create a new document
  }
});

module.exports = mongoose.model("Tasks", TaskSchema);