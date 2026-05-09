const fs = require("fs/promises")
const path = require("path")
const { root } = require("../util/rootpath")
const postModel = require("../models/postModel")


exports.getPosts = async (req, res, next) => {
    try {

        const posts = await postModel.find();

        if (!posts) {
            const error = new Error("Products Not found");
            error.status = 404
            throw error;
        }

        res.status(200).json({
            posts: posts,
            message: "Posts Find Successfully"
        })

    } catch (error) {
        next(error)

    }
}

exports.createPosts = async (req, res, next) => {


    if (!req.file) {
        const error = new Error("Please select file to upload");
        error.status = 422
        throw error
    }



    try {

        const post = new postModel({
            title: req.body.title,
            content: req.body.content,
            image: req.file.path.replace('\\', '/'),
            creator: {
                name: "Soban"
            }
        })

        const savedPost = await post.save();
        if (savedPost) {
            console.log("Post Saved Successfully")
            return res.status(201).json({
                post: savedPost,
                message: "Post Saved Successfully"
            })
        }





    } catch (error) {


        next(error)
    }




}
exports.getStatus = (req, res, next) => {
    res.status(200).json({
        status: "Online"
    })
}

exports.updateStatus = (req, res, next) => {
    res.status(200).json({
        status: "Offline"
    })
}


exports.getSinglePost = async (req, res, next) => {
    try {

        const postId = req.params.postId;
        const singlePost = await postModel.findOne({ _id: postId });
        if (!singlePost) {
            const error = new Error("Product not found")
            error.status = 404
            throw error
        }

        res.status(200).json({
            post: singlePost,
            message: "Post Successfully found"
        })


    } catch (error) {
        next(error)

    }




}

exports.updatePost = async (req, res, next) => {

    console.log(req.params.postId)

    try {
        const post = await postModel.findOne({ _id: req.params.postId });
        if (req.file) {
            let oldFilePath = post.image
            let updatedPath = oldFilePath.replace('/', '\\')

            let completePath = path.join(root, updatedPath);

           await  fs.unlink(completePath)

            post.title = req.body.title || post.title;
            post.content = req.body.content || post.content
            post.image = req.file.path.replace("\\", "/");

            await post.save()
            res.status(200).json({
                message:"Post updated successfuly",
                post
            })
        }else{

            post.title = req.body.title || post.title;
            post.content = req.body.content || post.content
            

            await post.save()

            res.status(200).json({
                message: "Post updated successfuly",
                post
            })
        }









    } catch (error) {
        console.log(error)
    }


}

exports.deletePost=async(req,res,next)=>{
try {

let post=await postModel.findById({_id:req.params.postId});



let deleteImagePath=path.join(root,path.normalize(post.image));


await fs.unlink(deleteImagePath);



    let deletepost = await postModel.deleteOne({ _id: req.params.postId })
    if(deletepost.deleteCount===0){
        const error=new Error("Post not found ")
        error.status=404
        next(error);
    }
    else{
        res.status(200).json({
            message:"Post deleted Successfully"
        })
    }
} catch (error) {
    next(error)
}
    



}