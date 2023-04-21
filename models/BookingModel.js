const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  hairSalon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HairSalon",
    required: [true, "Booking must belong to a BeautySalon ! "],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a User! "],
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },

  date: {
    type: Date,
    default: Date.now(),
    required: [true, " Booking must have a date"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "conclued", "cancelled"],
    default: "pending",
  },
});
// bookingSchema.pre(/^find/, function (next) {
//   this.populate("user").populate({
//     path: "beautySalon" || "  hairSalon",
//     select: "name",
//   });
// });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
