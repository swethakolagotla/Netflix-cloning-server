const express = require("express");
const { protect } = require("../controllers/authController.js");
const {
  updateUser,
  deleteUser,
  displaySingleUser,
  displayAllUser,
  userStats,
} = require("../controllers/UserController.js");
const router = express.Router();

router.patch("/update/:id", protect, updateUser);
router.delete("/delete/:id", protect, deleteUser);
router.get("/find/:id", displaySingleUser);
router.get("/findall", protect, displayAllUser);
router.get("/stats", userStats);
module.exports = router;
