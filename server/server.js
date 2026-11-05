require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware: parse JSON request bodies into req.body
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.status(200).send("Event Management API Running");
});

// Event API routes
app.use("/api/events", eventRoutes);

// Unknown routes return 404
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Error handler: must come last and take four parameters
app.use(errorHandler);

async function start() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }
}

start();