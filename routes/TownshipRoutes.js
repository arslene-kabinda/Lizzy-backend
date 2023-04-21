const express = require("express");

const router = express.Router();

const {
  getAllTownships,
  createTownship,
  getOneTownship,
  updateTownship,
  deleteTownship,
} = require("../controllers/TownshipController");

router.route("/").get(getAllTownships).post(createTownship);
router
  .route("/:id")
  .get(getOneTownship)
  .patch(updateTownship)
  .delete(deleteTownship);

module.exports = router;
