const User = require("../models/User");

// A valid MongoDB ObjectId is exactly 24 hexadecimal characters
function isValidId(id) {
    return /^[a-fA-F0-9]{24}$/.test(id);
}

// GET /api/users/:id
// Users may read only their own profile. req.user is loaded from the verified JWT.
async function getUserProfile(req, res) {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Ownership check: the requested ID must belong to the authenticated user
        if (id !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Access denied. You can only view your own profile.",
            });
        }

        return res.status(200).json({
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                createdAt: req.user.createdAt,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Could not load profile" });
    }
}

module.exports = { getUserProfile };