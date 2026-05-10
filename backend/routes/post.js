const express = require("express");
const { check } = require('express-validator');
const { validateToken } = require("../middlewares/validatingtoken")
const { uploadSingleFile } = require("../middlewares/singlefileUpload")
const { validationCheck } = require("../middlewares/validtionCheck")
const router = express.Router();


const postsContollers = require("../controllers/postControllers")


router.get('/posts', validateToken,postsContollers.getPosts)
router.post('/posts', validateToken,uploadSingleFile,

    check('title').notEmpty().trim().isLength({ min: 5 }).withMessage("title must be at least 5 characters"),
    check('content').notEmpty().withMessage("Content is Required").bail().isLength({ min: 5, max: 1000 }).withMessage("Content length not Valid"),
    validationCheck, postsContollers.createPosts);
router.put('/updatePost/:postId', validateToken, uploadSingleFile,
    check('title').notEmpty().trim().isLength({ min: 5 }).withMessage("title must be at least 5 characters"),
    check('content').notEmpty().withMessage("Content is Required").bail().isLength({ min: 5, max: 1000 }).withMessage("Content length not Valid"),
    validationCheck,
    postsContollers.updatePost);

router.get("/singlepost/:postId", validateToken, postsContollers.getSinglePost);
router.get('/status', postsContollers.getStatus);

router.delete("/post/:postId", validateToken, postsContollers.deletePost)

module.exports = router