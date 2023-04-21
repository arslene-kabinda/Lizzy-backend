const mongoose = require("mongoose");
// const validator = require("validator");

const serviceSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String,
    required: [true, "prestation must have a name "],
  },
  pictures: {
    type: String,
    // required: [true, " service  must have pictures"],
  },
  description: {
    type: String,
    required: [true, "give a brief description of the service "],
  },
  hairSalon: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "HairSalon",
  }],
  // beautySalon: [{ type: mongoose.Schema.Types.ObjectId, ref: "BeautySalon" }],
  booking: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  price: {
    type: Number,
    required: [true, "specified service price "],
  },
});
const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
