const express = require("express");
const router = express.Router();

const {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
} = require("../controllers/eventController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getEvents);
router.get("/:id", getEventById);

// Admin-only routes. Order matters: protect runs first, then adminOnly.
router.post("/", protect, adminOnly, createEvent);
router.put("/:id", protect, adminOnly, updateEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);

module.exports = router;