import express from "express";
import { validationResult } from "express-validator";

import auth from "../middlewares/auth.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { profileCreateValidators } from "../middlewares/validators.js";

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

        res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error")
    }
});


// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post("/", [auth, profileCreateValidators], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(error => error.msg) });
    };

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // build profile object or initialize object
    const profileFields = {};

    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(",").map(skill => skill.trim());
    };

    // build social object
    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            //  Update profile
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            
            return res.status(200).json(profile);
        };

        profile = new Profile(profileFields);

        const newProfile = await profile.save();

        res.status(201).json(newProfile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router;