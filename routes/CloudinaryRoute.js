const express = require("express");

const cloudinary = require("../utils/services/cloudinary.config");

const upload = require("../utils/services/ multer");

const router = express.Router();

router.post("/", upload.single("image"), productController.createProduct);

module.exports = router;
