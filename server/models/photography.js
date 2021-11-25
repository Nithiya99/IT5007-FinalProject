const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const photographySchema = new mongoose.Schema({
  title: {
    type: String,
    requires: true,
  },
  description: {
    type: String,
    requires: true,
  },
  image: {
    type: String,
  },
  serviceBy: {
    type: ObjectId,
    ref: "Business",
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Photography", photographySchema);
