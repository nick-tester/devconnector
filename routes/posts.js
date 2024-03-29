import express from "express";
import { check, validationResult } from "express-validator";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Profile from "../models/Profile.js";

import auth from "../middlewares/auth.js";

const router = express.Router();

// @route   GET /api/posts
// @desc    Get current user's posts
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });

        if (posts.length === 0) {
            return res.status(404).json({ errors: [{ msg: "Posts not found!" }] })
        }

        res.status(200).json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    };
});


// @route   GET /api/posts/post/:id
// @desc    Find a post by its ID
// @access  Public
router.get("/post/:post_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ errors: [{ msg: "Post not found!" }] })
        }

        res.status(200).json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "Post not found..." }] });
        }
        res.status(500).send("Server error");
    };
});


// @route   GET /api/posts
// @desc    Get current user's posts
// @access  Private
router.get("/me", auth, async (req, res) => {
    try {
        const userPosts = await Post.find({ user: req.user.id });

        if (userPosts.length === 0) {
            return res.status(404).json({ errors: [{ msg: "Posts not found!" }] })
        }

        res.status(200).json(userPosts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    };
});


// @route   PUT /api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ errors: [{ msg: "Post not found!" }] });
        }

        const isLikedByUser = post.likes.filter(like => like.user.toString() === req.user.id).length > 0

        if (isLikedByUser) {
            return res.status(400).json({ errors: [{ msg: "Post already liked by this user" }] })
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.status(200).json(post.likes);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "Post not found..." }] });
        }
        res.status(500).send("Server error");
    };
});


// @route   PUT /api/posts/unlike/:post_id
// @desc    Unlike a post
// @access  Private
router.put("/unlike/:post_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ errors: [{ msg: "Post not found!" }] });
        }

        const isLikedByUser = post.likes.filter(like => like.user.toString() === req.user.id).length === 0

        if (isLikedByUser) {
            return res.status(400).json({ errors: [{ msg: "Post has not yet been liked" }] })
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.status(200).json(post.likes);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "Post not found..." }] });
        }
        res.status(500).send("Server error");
    };
});


// @route   POST /api/posts
// @desc    Create a post
// @access  Private
router.post("/", [auth, [check("text", "Text is required.").notEmpty()]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(error => error.msg) });
    };

    try {
        const user = await User.findById(req.user.id).select("-password");

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error")
    }
});


// @route   POST /api/posts/comment/:post_id
// @desc    Create a post comment
// @access  Private
router.post("/comment/:post_id", [auth, [check("text", "Text is required.").notEmpty()]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(error => error.msg) });
    };

    try {
        const user = await User.findById(req.user.id).select("-password");

        const post = await Post.findById(req.params.post_id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment);

        await post.save();

        res.status(201).json(post.comments);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error")
    }
});


// @route   DELETE /api/posts/comment/:post_id/:comment_id
// @desc    delete a post comment
// @access  Private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found..." })
        }

        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        if (!comment) {
            return res.status(404).json({ errors: [{ msg: "Comment not found!" }] });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ errors: [{ msg: "User not authorized" }] });
        }

        const removeIndex = post.comments
            .map(comment => comment.user.toString())
            .indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.status(200).json(post.comments)
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "Comment/Post not found..." }] });
        }
        res.status(500).send("Server error");
    };
});


// @route   DELETE /api/posts
// @desc    delete a post
// @access  Private
router.delete("/post/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found..." })
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: [{ msg: "User not authorized!" }] })
        }

        await post.remove();

        res.status(200).json({ msg: "Post removed!" })
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "Post not found..." }] });
        }
        res.status(500).send("Server error");
    };
});

export default router;