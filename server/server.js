require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Event Management API Running");
});

// Authentication endpoints
app.use("/api/auth", authRoutes);

// Event endpoints
app.use("/api/events", eventRoutes);

// Unknown routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Error handler: must come last
app.use(errorHandler);

async function start() {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing from server/.env");
        }

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