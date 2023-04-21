const express = require("express");

const userController = require("../controllers/UserController");

const authController = require("../controllers/authController");

const cloudinary = require("../utils/services/cloudinary.config");

const upload = require("../utils/services/ multer");

const router = express.Router();
const User = require("../models/UserModel");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    // res.json(result);
    const bodi = req.body;
    bodi.cloudinary_id = result.public_id;
    bodi.avatar = result.secure_url;
    const user = new User(bodi);
    await user.save();
    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
  }
});
// router.use(authController.restrictTo("admin"));

router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getOneUser)
  .post(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
