import dotenv from "dotenv";
import axios from "axios";
import express from "express";
import { validationResult } from "express-validator";

import auth from "../middlewares/auth.js";
import Profile from "../models/Profile.js";
import {
    profileCreateValidators,
    profileExperienceValidators,
    profileEducationValidators
} from "../middlewares/validators.js";

dotenv.config();

const router = express.Router();


router.route("/me")
    // @route   GET /api/profile
    // @desc    Get current user profile
    // @access  Public
    .get(auth, async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);

            if (!profile) {
                return res.status(400).json({ errors: [{ msg: "Profile not found..." }] });
            }

            res.status(200).json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error")
        }
    })
    // @route   DELETE /api/profile
    // @desc    Removed user's profile
    // @access  Private
    .delete(auth, async (req, res) => {
        try {
            // remove profile
            await Profile.findOneAndRemove({ user: req.user.id });

            res.status(200).json("Successfully removed user's profile!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error")
        }
    });


router.route("/")
    // @route   GET /api/profile
    // @desc    Get all profiles
    // @access  Public
    .get(async (req, res) => {
        try {
            const profiles = await Profile.find().populate("user", ["name", "avatar"]);

            if (!profiles) {
                return res.status(404).json({ errors: [{ msg: "Profiles not found..." }] });
            }

            res.status(200).json(profiles);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error")
        }
    })
    // @route   POST /api/profile
    // @desc    Create user profile
    // @access  Private
    .post([auth, profileCreateValidators], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
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


// @route   GET /api/profile/user/:id
// @desc    Get user profile by ID
// @access  Public
router.get("/user/:id", async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.id }).populate("user", ["name", "avatar"]);

        if (!profile) {
            return res.status(404).json({ errors: [{ msg: "Profile not found..." }] });
        }

        res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "Profile not found..." }] });
        }
        res.status(500).send("Server error")
    }
});


// @route   PUT /api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put("/experience", [auth, profileExperienceValidators], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(error => error.msg) });
    };

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);

        await profile.save();

        res.status(201).json(profile.experience[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error")
    }
});


// @route   DELETE /api/profile/experience
// @desc    Remove user profile experience
// @access  Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


// @route   PUT /api/profile/education
// @desc    Add profile education
// @access  Private
router.put("/education", [auth, profileEducationValidators], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(error => error.msg) });
    };

    const {
        school,
        level,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        level,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);

        await profile.save();

        res.status(201).json(profile.education[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error")
    }
});


// @route   DELETE /api/profile/education
// @desc    Remove user profile education
// @access  Private
router.delete("/education/:edu_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});



//route:        GET api/profile/github/:username
//desc:         get user repos from github
//access:       public
//note:         https://api.github.com/users/nick-tester/repos?per_page=5&sort=created:asc
router.get("/github/:username", async (req, res) => {
    try {
        const { username } = req.params;

        const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`;

        // encodeURI is a nodejs built-in function
        const uri = encodeURI(url);

        const headers = {
            "user-agent": "node.js",
            Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
        };

        const requested = await axios.get(uri, { headers });

        res.status(200).json(requested.data);
    } catch (err) {
        console.log(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "Github repos not found..." }] });
        }
        res.status(500).send("Server error");
    }
});

export default router;