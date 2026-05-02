const express=require("express");
const router=express.Router();
const postsContollers=require("../controllers/postControllers")
router.get('/posts',postsContollers.getPosts)
router.post('/posts',postsContollers.createPosts);

module.exports=router