const HairSalon = require("../models/HairSalonModel");

const APIFeatures = require("../utils/apiFeatures");

exports.aliasTopHairSalons = (req, res, next) => {
  req.query.limit = "4";
  req.query.sort = "createdAt";
  req.query.fields = "name,ratingsAverage";
  next();
};

exports.createHairSalon = async (req, res) => {
  try {
    const bodies = req.body;
    console.log({ bodies });
    bodies.owner = req.decoded.id;
    const newHairSalon = await HairSalon.create(bodies);
    console.log({ newHairSalon });
    res.status(201).json({
      status: "the creation of the hairsalon is done with success",
      data: {
        newHairSalon,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllHairSalon = async (req, res) => {
  try {
    const features = new APIFeatures(
      HairSalon.find().populate("owner").populate("township"),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const hairSalons = await features.query;
    // const hairSalons = await HairSalon.find();

    //SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: hairSalons.length,

      hairSalons,
    });
  } catch (err) {
    res.status(400).json({
      status: "failled",
      message: err,
    });
  }
};

exports.getHairSalon = async (req, res) => {
  console.log({ req: req.params.id });
  try {
    const hairSalon = await HairSalon.findOne({ _id: req.params.id })
      .populate("owner")
      .populate("township")
      .populate("service");

    console.log({ hairSalon });

    res.status(200).json({
      status: "success",
      hairSalon,
    });
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getOwnSalon = async (req, res) => {
  console.log({ req: req.params.id });
  try {
    const hairSalon = await HairSalon.findOne({ owner: req.params.id })
      .populate("owner")
      .populate("township")
      .populate("service");

    console.log({ hairSalon });

    res.status(200).json({
      status: "success",
      hairSalon,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
exports.updateHairSalon = async (req, res) => {
  try {
    const hairSalon = await HairSalon.findByIdAndUpdate(
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
        hairSalon,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deleteHairSalon = async (req, res) => {
  try {
    const hairSalon = await HairSalon.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "hairSalon deleted successfully",
      data: {
        hairSalon,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "invalid data sent!",
    });
  }
};
