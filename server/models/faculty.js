const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema(
  {
   image:String,
   name: String,
   role: String
  },
  {
    collection: "ImageDetails_faculty",
  }
);

mongoose.model("faculties", ImageDetailsScehma);
