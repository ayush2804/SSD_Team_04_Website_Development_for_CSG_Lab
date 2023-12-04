const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema(
  {
   image:String,
   name: String,
   role: String
  },
  {
    collection: "ImageDetails",
  }
);

mongoose.model("ImageDetails", ImageDetailsScehma);
