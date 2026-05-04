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

exports.createPosts=(req,res,next)=>{

    res.json({
        post:[{title:req.body.title,price:req.body.price}]
    })
}
exports.getStatus=(req,res,next)=>{
    res.status(200).json({
        status:"Online"
    })
}
