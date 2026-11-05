const Event = require("../models/Event");

const ALLOWED_FIELDS = ["title", "description", "date", "time", "location", "category", "status"];
const REQUIRED_FIELDS = ["title", "description", "date", "time", "location", "category"];

// Only copy known fields, so clients can't set _id or timestamps
function pickFields(body) {
    const data = {};
    ALLOWED_FIELDS.forEach((field) => {
        if (body[field] !== undefined) data[field] = body[field];
    });
    return data;
}

// A valid MongoDB ObjectId is exactly 24 hexadecimal characters
function isValidId(id) {
    return /^[a-fA-F0-9]{24}$/.test(id);
}

// GET /api/events
async function getEvents(req, res, next) {
    try {
        const events = await Event.find().sort({ createdAt: 1 });
        res.status(200).json(events);
    } catch (err) {
        next(err);
    }
}

// GET /api/events/:id
async function getEventById(req, res, next) {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(event);
    } catch (err) {
        next(err);
    }
}

// POST /api/events
async function createEvent(req, res, next) {
    try {
        const event = await Event.create(pickFields(req.body || {}));
        res.status(201).json({ message: "Event created successfully", event });
    } catch (err) {
        next(err);
    }
}

// PUT /api/events/:id
// PUT replaces the whole event. Every required field is assigned from the body, so a missing field
// becomes undefined and Mongoose rejects the save with a validation error.
async function updateEvent(req, res, next) {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const body = req.body || {};

        REQUIRED_FIELDS.forEach((field) => {
            event[field] = body[field];
        });
        event.status = body.status ?? event.status;

        await event.save();

        res.status(200).json({ message: "Event updated successfully", event });
    } catch (err) {
        next(err);
    }
}

// DELETE /api/events/:id
async function deleteEvent(req, res, next) {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ message: "Event deleted successfully", event });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};