const Service = require("../models/ServiceModel");
const APIFeatures = require("../utils/apiFeatures");

exports.createService = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.status(201).json({
      status: "service  created successfully",
      newService,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: err.code,
      message: err.message,
    });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const features = new APIFeatures(Service.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const services = await features.query
      .populate(["hairSalon"])
      .populate(["beautySalon"]);

    // Send response
    res.status(200).json({
      status: "Success",
      numberOfServices: services.length,
      services,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getOneService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "hairSalon"
      // "beautySalon"
    );
    console.log({ service });
    res.status(200).json({
      status: "success",
      service,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      service,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "service deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "not found",
      message: err.message,
    });
  }
};
