const { validationResult }=require("express-validator")
const postModel=require("../models/postModel")


exports.getPosts=(req,res,next)=>{
    res.status(200).json({
        posts:[
            {
                _id:1,
                title:"My Car",
                imageUrl:'http://localhost:8080/images/car.jpg',
                createdAt:Date.now(),
                creator:{
                    name:"Soban"
                }
        }
    ],
        totalItems:0,
    })
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
