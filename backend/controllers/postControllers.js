const { validationResult }=require("express-validator")
const postModel=require("../models/postModel")


exports.getPosts=async(req,res,next)=>{
try {
    
const posts= await postModel.find();

if(!posts){
    const error=new Error("Products Not found");
    error.status=404
    throw error;
}

res.status(200).json({
    posts:posts,
    message:"Posts Find Successfully"
})

} catch (error) {
next(error)
    
}
}

exports.createPosts=async(req,res,next)=>{
console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       const error=new Error("Validation Error")
       error.status=422
       throw error
    }

    try {
        
        const post = new postModel({
            title: req.body.title,
            content: req.body.content,
            image: '/images/7seater.jpg',
            creator: {
                name: "Soban"
            }
        })

      const savedPost=  await post.save();
      if(savedPost){
        console.log("Post Saved Successfully")
      return  res.status(201).json({
            post:savedPost,
            message:"Post Saved Successfully"
        })
      }





    } catch (error) {
      

        next(error)
    }
 

    
    
}
exports.getStatus=(req,res,next)=>{
    res.status(200).json({
        status:"Online"
    })
}

exports.updateStatus=(req,res,next)=>{
    res.status(200).json({
        status: "Offline"
    })
}


exports.getSinglePost=async(req,res,next)=>{
try {
    
    const postId = req.params.postId;
    const singlePost = await postModel.findOne({ _id: postId });
    if(!singlePost){
        const error=new Error("Product not found")
        error.status=404
        throw error
    }

    res.status(200).json({
        post:singlePost,
        message:"Post Successfully found"
    })


} catch (error) {
    next(error)
    
}

   


}