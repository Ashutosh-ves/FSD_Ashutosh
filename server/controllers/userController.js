const User = require("../models/User");

// GET /api/users/:id
// LAB ONLY: intentionally vulnerable (Broken Access Control / IDOR).
// The caller must be logged in, but nothing checks that the requested profile belongs to them.
async function getUserProfile(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
}

module.exports = { getUserProfile };