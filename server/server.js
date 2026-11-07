require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Event Management API Running");
});

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

// One HTTP server shared by Express and Socket.IO
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: allowedOrigin,
        methods: ["GET", "POST"],
    },
});

// Runs once for every client that connects
io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", socket.id, reason);
    });
});

// Makes io available in controllers as req.app.get("io")
app.set("io", io);

async function start() {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing from server/.env");
        }

        await connectDB();

        server.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }
}

start();