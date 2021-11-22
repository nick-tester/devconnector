import express from "express";

const router = express.Router();

// @route   GET api/auth
// @desc    test route
// @access  Public
router.get("/", (req, res) => res.send("auth route"))

export default router;