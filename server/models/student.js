const mongoose = require("mongoose");

const ImageDetailsSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    age: String,
  },
  {
    collection: "ImageDetails_Student", // Assuming the collection name is "ImageDetails"
  }
);

mongoose.model("students", ImageDetailsSchema);
