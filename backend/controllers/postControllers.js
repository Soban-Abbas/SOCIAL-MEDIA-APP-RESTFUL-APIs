exports.getPosts=(req,res,next)=>{
    res.json({
        message:"These are your Posts"
    })
}

exports.createPosts=(req,res,next)=>{

    res.json({
        post:[{title:req.body.title,price:req.body.price}]
    })
}