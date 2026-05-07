const express=require("express");
const { check } = require('express-validator');
const router=express.Router();
const postsContollers=require("../controllers/postControllers")
router.get('/posts',postsContollers.getPosts)
router.post('/posts',

    check('title').notEmpty().trim().isLength({ min: 5 }).withMessage("title must be at least 5 characters"),
    check('content').notEmpty().withMessage("Content is Required").bail().isLength({ min: 5, max: 1000 }).withMessage("Content length not Valid")



    ,postsContollers.createPosts);
router.get("/singlepost/:postId", postsContollers.getSinglePost);    
router.get('/status',postsContollers.getStatus);
router.patch('/status',postsContollers.updateStatus)
module.exports=router