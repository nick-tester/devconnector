import express from "express";

import auth from "../middlewares/auth.js";
import Profile from "../models/Profile.js";
// import User from "../models/User.js";

const router = express.Router();

// @route   GET api/profile
// @desc    Get current user profile
// @access  Public
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);

        if (!profile) {
            return res.status(400).json({ errors: [{ msg: "There no profile for this user." }] });
        }

        res.send("test profile route");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error")
    }
})

export default router;