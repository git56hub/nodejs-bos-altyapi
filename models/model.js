const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  surname: {
    type: String,
    requure: true
  },
  age: Number
});

module.exports = mongoose.model("Model", Schema);