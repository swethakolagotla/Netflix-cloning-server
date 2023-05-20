const express = require("express");
const { protect } = require("../controllers/authController.js");
const {
  createMovie,
  updateMovie,
  deleteMovie,
  displaySinglemovie,
  getRandomMovie,
  displayAllmovie,
  searchMovie,
} = require("../controllers/MovieController.js");
const router = express.Router();

router.post("/create", protect, createMovie);
router.patch("/update/:id", protect, updateMovie);
router.delete("/delete/:id", protect, deleteMovie);
router.get("/singlefind/:id", displaySinglemovie);
router.get("/random", getRandomMovie);
router.get("/allmovie", protect, displayAllmovie);
router.get("/search/:key", searchMovie);
module.exports = router;
