const express = require("express");

const router = express.Router();
// const { protect, restrictTo } = require("../controllers/authController");

const {
  createBooking,
  getAllBooking,
  // getBookingByUser,
  getOneBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/BookingController");

// routes
router.route("/").get(getAllBooking).post(createBooking);

router
  .route("/:id")
  .get(getOneBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

module.exports = router;
