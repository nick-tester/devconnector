const express = require("express");
const { validationResult } = require("express-validator");

const { userRegisterValidators } = require("../middlewares");

const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", userRegisterValidators, (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(error => error.msg) });
    };
    
    // see if user exists

    // get user gravatar

    // encrypt password

    // return jsonwebtoken

    res.status(201).json({ ...req.body });
});


module.exports = router;