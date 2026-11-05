function errorHandler(err, req, res, next) {
    // Malformed JSON in the request body
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ message: "Malformed JSON in request body" });
    }

    // Mongoose validation failed (missing field, bad category, bad status)
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map((e) => e.message)
            .join("; ");
        return res.status(400).json({ message });
    }

    // Bad ID format that slipped past the controller check
    if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid event ID" });
    }

    // Anything else is a server error
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
}

module.exports = errorHandler;