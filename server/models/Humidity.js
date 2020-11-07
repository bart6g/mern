const mongoose = require("mongoose");

const humiditySchema = new mongoose.Schema({
  sensorId: { type: mongoose.Schema.Types.ObjectId },
  date: { type: Date, required: true },
  humidity: { type: Number, required: true },
});

module.exports = Humidity = mongoose.model(
  "humidity",
  humiditySchema,
  "humidity"
);
