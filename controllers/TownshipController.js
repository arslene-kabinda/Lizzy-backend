const Township = require("../models/TownshipModel");

exports.createTownship = async (req, res) => {
  try {
    const newTownship = await Township.create(req.body);
    res.status(201).json({
      status: "the creation of the township is done with success",
      data: {
        newTownship,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllTownships = async (req, res) => {
  try {
    const townships = await Township.find();
    res.status(200).json({
      message: "success",
      results: townships.length,

      townships,
    });
  } catch (err) {
    res.status(404).json({
      satus: "failed",
      message: err.message,
    });
  }
};

exports.getOneTownship = async (req, res, next) => {
  try {
    const township = await Township.findById(req.params.id);

    console.log({ township });

    res.status(200).json({
      status: "success",
      township,
    });
  } catch (err) {
    res.status(404).json({
      satus: "failed",
      message: err.message,
    });
  }
};

exports.updateTownship = async (req, res, next) => {
  try {
    const township = await Township.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });
    res.status(200).json({
      status: "success",

      township,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.deleteTownship = async (req, res, next) => {
  try {
    await Township.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "township deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};
