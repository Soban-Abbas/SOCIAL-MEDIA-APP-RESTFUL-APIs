const express=require("express");
const router=express.Router();
const postsContollers=require("../controllers/postControllers")
router.get('/posts',postsContollers.getPosts)
router.post('/posts',postsContollers.createPosts);
router.get('/status',postsContollers.getStatus);
router.patch('/status',postsContollers.updateStatus)
module.exports=router