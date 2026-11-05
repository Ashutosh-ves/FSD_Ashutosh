const mongoose = require("mongoose");

const CATEGORIES = ["Tech", "Design", "Career"];
const STATUSES = ["open", "closed"];

const eventSchema = new mongoose.Schema(
    {
        title: { type: String, required: [true, "title is required"], trim: true },
        description: { type: String, required: [true, "description is required"], trim: true },
        date: { type: String, required: [true, "date is required"], trim: true },
        time: { type: String, required: [true, "time is required"], trim: true },
        location: { type: String, required: [true, "location is required"], trim: true },
        category: {
            type: String,
            required: [true, "category is required"],
            enum: { values: CATEGORIES, message: "category must be one of: Tech, Design, Career" },
        },
        status: {
            type: String,
            enum: { values: STATUSES, message: 'status must be "open" or "closed"' },
            default: "open",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);