import express from "express";

import User from "../models/User.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// @route   GET api/users
// @desc    Return user profile
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router;