// In-memory data. Restarting the server resets it to these three events.
let events = [
    {
        id: 1,
        title: "Tech Fest 2026",
        description: "A technology event for students.",
        date: "20 September 2026",
        time: "10:00 AM",
        location: "Mumbai",
        category: "Tech",
        status: "open",
    },
    {
        id: 2,
        title: "React Workshop",
        description: "Learn React from basics to advanced.",
        date: "25 September 2026",
        time: "02:00 PM",
        location: "Pune",
        category: "Design",
        status: "open",
    },
    {
        id: 3,
        title: "AI Conference",
        description: "Explore the latest developments in AI.",
        date: "30 September 2026",
        time: "09:30 AM",
        location: "Bangalore",
        category: "Career",
        status: "closed",
    },
];

const REQUIRED_FIELDS = ["title", "description", "date", "time", "location", "category"];
const CATEGORIES = ["Tech", "Design", "Career"];
const STATUSES = ["open", "closed"];

function clean(value) {
    return String(value).trim();
}

// Returns an error message, or null if the body is valid
function validateEvent(body) {
    const missing = REQUIRED_FIELDS.filter((field) => !body[field] || !clean(body[field]));
    if (missing.length > 0) {
        return `Missing required fields: ${missing.join(", ")}`;
    }
    if (!CATEGORIES.includes(body.category)) {
        return `category must be one of: ${CATEGORIES.join(", ")}`;
    }
    if (body.status !== undefined && !STATUSES.includes(body.status)) {
        return 'status must be "open" or "closed"';
    }
    return null;
}

function buildEvent(body, id, fallbackStatus) {
    return {
        id,
        title: clean(body.title),
        description: clean(body.description),
        date: clean(body.date),
        time: clean(body.time),
        location: clean(body.location),
        category: body.category,
        status: body.status || fallbackStatus,
    };
}

// GET /api/events
function getEvents(req, res) {
    res.status(200).json(events);
}

// GET /api/events/:id
function getEventById(req, res) {
    const id = Number(req.params.id);
    const event = events.find((item) => item.id === id);

    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
}

// POST /api/events
function createEvent(req, res) {
    // req.body is undefined if the request has no JSON Content-Type
    const body = req.body || {};
    const error = validateEvent(body);

    if (error) {
        return res.status(400).json({ message: error });
    }

    const nextId = events.length ? Math.max(...events.map((item) => item.id)) + 1 : 1;
    const newEvent = buildEvent(body, nextId, "open");

    events.push(newEvent);

    res.status(201).json({ message: "Event created successfully", event: newEvent });
}

// PUT /api/events/:id
function updateEvent(req, res) {
    const id = Number(req.params.id);
    const index = events.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Event not found" });
    }

    const body = req.body || {};
    const error = validateEvent(body);

    if (error) {
        return res.status(400).json({ message: error });
    }

    events[index] = buildEvent(body, id, events[index].status);

    res.status(200).json({ message: "Event updated successfully", event: events[index] });
}

// DELETE /api/events/:id
function deleteEvent(req, res) {
    const id = Number(req.params.id);
    const deleted = events.find((item) => item.id === id);

    if (!deleted) {
        return res.status(404).json({ message: "Event not found" });
    }

    events = events.filter((item) => item.id !== id);

    res.status(200).json({ message: "Event deleted successfully", event: deleted });
}

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};