const mongoose = require("mongoose");

const temperatureSchema = new mongoose.Schema({
  sensorId: { type: mongoose.Schema.Types.ObjectId },
  date: { type: Date, required: true },
  humidity: { type: Number, required: true },
});

module.exports = Temperature = mongoose.model(
  "temperature",
  temperatureSchema,
  "temperature"
);
