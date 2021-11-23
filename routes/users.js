import express from "express";

import User from "../models/User.js";
import Profile from "../models/Profile.js";
import auth from "../middlewares/auth.js";

const router = express.Router();


router.route("/")
    // @route   GET /api/users
    // @desc    Get user details
    // @access  Private
    .get(auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select("-password");

            res.status(200).json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    })
    // @route   DELETE /api/user
    // @desc    Delete user profile
    // @access  Private
    .delete(auth, async (req, res) => {
        try {
            // remove user's posts
    
            // remove profile
            await Profile.findOneAndRemove({ user: req.user.id });
            
            // remove user
            await User.findOneAndRemove({ _id: req.user.id });
            
            res.status(200).json("Successfully removed user!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error")
        }
    });


// @route   GET /api/users/all
// @desc    Get all users. Development purpose only
// @access  Public
router.get("/all", async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router;