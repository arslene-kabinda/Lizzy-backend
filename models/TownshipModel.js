const mongoose = require("mongoose");

const TownshipSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String,
    required: true,
  },
  coverPicture: {
    type: String,
    required: true,
  },
  hairSalon: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HairSalon",
    },
  ],
  beautySalon: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BeautySalon",
    },
  ],
});

const Township = mongoose.model("Township", TownshipSchema);

module.exports = Township;
