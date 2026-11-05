require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Event = require("./models/Event");

const seedEvents = [
    {
        title: "Tech Fest 2026",
        description: "A technology event for students.",
        date: "20 September 2026",
        time: "10:00 AM",
        location: "Mumbai",
        category: "Tech",
        status: "open",
    },
    {
        title: "React Workshop",
        description: "Learn React from basics to advanced.",
        date: "25 September 2026",
        time: "02:00 PM",
        location: "Pune",
        category: "Design",
        status: "open",
    },
    {
        title: "AI Conference",
        description: "Explore the latest developments in AI.",
        date: "30 September 2026",
        time: "09:30 AM",
        location: "Bangalore",
        category: "Career",
        status: "closed",
    },
];

async function seed() {
    try {
        await connectDB();
        await Event.deleteMany({});
        await Event.insertMany(seedEvents);
        console.log(`Seeded ${seedEvents.length} events`);
    } catch (err) {
        console.error("Seeding failed:", err.message);
    } finally {
        await mongoose.connection.close();
    }
}

seed();