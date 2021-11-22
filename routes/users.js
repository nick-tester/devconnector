import express from "express";
import { validationResult } from "express-validator";
import normalize from "normalize-url";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";

import { userRegisterValidators } from "../middlewares/index.js";
import User from "../models/User.js";

const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", userRegisterValidators, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(error => error.msg) });
    };
    
    const { name, email, password } = req.body;
    
    try {
        
        // see if user exists
        let user = await User.findOne({ email });

        if(user) {
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
        
        if(!newUser) throw new Error("Server error");

        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


export default router;