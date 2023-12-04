const mongoose = require ('mongoose')

const projectSchema = new mongoose.Schema({
  
  "name": "string",
  "auth": "string",
  "dept": "string",
  "grant": "number",
});

const Project = mongoose.model("projects", projectSchema)
module.exports = Project;
