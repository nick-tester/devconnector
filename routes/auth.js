import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import normalize from "normalize-url";
import gravatar from "gravatar";

import User from "../models/User.js";
import auth from "../middlewares/auth.js";
import {
    userRegisterValidators,
    userLoginValidators
} from "../middlewares/validators.js";

dotenv.config();

const router = express.Router();

// @route   GET /api/auth
// @desc    test route
// @access  Public
router.get("/", auth, (req, res) => res.send("auth route"));


// @route   POST /api/auth/login
// @desc    Login user and acquire token
// @access  Public
router.post("/login", userLoginValidators, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(error => error.msg) });
    };

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials!" }] });
        };

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials!" }] });
        };

        // return jsonwebtoken
        const payload = {
            user: {
                id: user._id,
                name: user.name
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 });

        res.status(200).json(token);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post("/register", userRegisterValidators, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(error => error.msg) });
    };

    const { name, email, password } = req.body;

    try {

        // see if user exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exist!" }] });
        };

        // get user gravatar
        const avatar = normalize(gravatar.url(email, {
            s: "200",
            r: "x",
            d: "mm"
        }, true));

        user = new User({
            name, email, avatar, password
        });

        // encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        // save user
        const newUser = await user.save();

        // return jsonwebtoken
        const payload = {
            user: {
                id: newUser._id,
                name: newUser.name
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 });

        res.status(201).json(token);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router;