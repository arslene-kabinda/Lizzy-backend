const express = require("express");

const router = express.Router();

const { protect, restrictTo } = require("../controllers/authController");

const {
  getAllBeautySalon,
  createBeautySalon,
  getBeautySalon,
  deleteBeautySalon,
  updateBeautySalon,
} = require("../controllers/BeautySalonControllers");

router
  .route("/")
  .get(protect, getAllBeautySalon)
  .post(
    protect,
    restrictTo(["admin", "beauty_salon_owner"]),
    createBeautySalon
  );
router
  .route("/:id")
  .get(getBeautySalon)
  .patch(
    protect,
    restrictTo(["admin", "beauty_salon_owner"]),
    updateBeautySalon
  )
  .delete(
    protect,
    restrictTo(["admin", "beauty_salon_owner"]),
    deleteBeautySalon
  );

module.exports = router;
