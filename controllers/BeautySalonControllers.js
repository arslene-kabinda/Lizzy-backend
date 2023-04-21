const BeautySalon = require("../models/BeautySalon");
const APIFeatures = require("../utils/apiFeatures");

exports.createBeautySalon = async (req, res) => {
  try {
    console.log("decoded:", req.decoded.id);
    const bodies = req.body;
    bodies.owner = req.decoded.id;

    const newBeautySalon = await BeautySalon.create(bodies);

    res.status(201).json({
      status: "the creation of the hairsalon is done with success",
      data: {
        newBeautySalon,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllBeautySalon = async (req, res) => {
  try {
    const features = new APIFeatures(
      BeautySalon.find().populate("owner").populate("township"),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const beautySalons = await features.query;
    // const beautySalons = await BeautySalon.find();
    //SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: beautySalons.length,
      data: {
        beautySalons,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failled",
      message: err,
    });
  }
};

exports.getBeautySalon = async (req, res) => {
  try {
    const beautySalon = await BeautySalon.findById(req.params.id)
      .populate("owner")
      .populate("township");

    res.status(200).json({
      status: "success",
      data: {
        beautySalon,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.updateBeautySalon = async (req, res) => {
  try {
    const beautySalon = await BeautySalon.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        beautySalon,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
exports.deleteBeautySalon = async (req, res) => {
  try {
    await BeautySalon.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "hairSalon deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "invalid data sent!",
    });
  }
};
