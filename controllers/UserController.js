const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const cloudinary = require("../utils/services/cloudinary.config");
// const upload = require("../utils/services/ multer");

// exports.uploadImage = async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path);
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    message: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("beautySalon")
      .populate("hairSalon");
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      satus: "failed",
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "user deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};
