const express = require("express");

const router = express.Router();

// const { protect, restrictTo } = require("../controllers/authController");

const {
  createService,
  getAllServices,
  getOneService,
  updateService,
  deleteService,
} = require("../controllers/ServiceController");

router.route("/").get(getAllServices).post(createService);

router
  .route("/:id")
  .get(getOneService)
  .patch(updateService)
  .delete(deleteService);

module.exports = router;
