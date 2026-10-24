function errorHandler(err, req, res, next) {
    // Malformed JSON in the request body
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ message: "Malformed JSON in request body" });
    }

    // Anything else is a server error
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
}

module.exports = errorHandler;