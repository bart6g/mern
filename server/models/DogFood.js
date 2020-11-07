const mongoose = require("mongoose");

const dogfoodSchema = new mongoose.Schema({
  sensorId: { type: mongoose.Schema.Types.ObjectId },
  date: { type: Date, required: true },
  humidity: { type: Number, required: true },
});

module.exports = DogFood = mongoose.model("dogFood", dogfoodSchema, "dogFood");
