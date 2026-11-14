const express = require("express");
const router = express.Router();

const { getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Logged-in users only. Nothing else is checked yet, which is the flaw under test.
router.get("/:id", protect, getUserProfile);

module.exports = router;