const mongoose = require ('mongoose')

const eventSchema = new mongoose.Schema({
  "name": String,
  "desc": String,
});

const Event = mongoose.model("events", eventSchema)
module.exports = Event

