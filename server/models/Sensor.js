const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: { type: String, required: true },
  topic: { type: String, required: true },
});

module.exports = Sensor = mongoose.model("sensor", sensorSchema);
