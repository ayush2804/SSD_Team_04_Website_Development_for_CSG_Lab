const mongoose = require ('mongoose')

const paperSchema = new mongoose.Schema({

  "name": "String",
  "auth": "string",
  "jurnl": "string",
  "year": "Number",
  
});

const Paper = mongoose.model("paper", paperSchema)
module.exports = Paper
