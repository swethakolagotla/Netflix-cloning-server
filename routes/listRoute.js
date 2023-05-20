const express = require("express");
const { protect} = require("../controllers/authController.js");
const {
  createList,
  deleteList,
  displayAllList,
} = require("../controllers/listController.js");
const router = express.Router();

router.post("/create", protect, createList);
router.delete("/delete/:id", protect, deleteList);
router.get("/getalllist", displayAllList);
module.exports = router;
