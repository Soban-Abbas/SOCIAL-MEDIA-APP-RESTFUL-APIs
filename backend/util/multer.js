
const multer=require("multer")
const path =require("path")

const stroage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'images')
    },
    filename:function(req,file,cb){
        const fileName=Date.now()+'-'+file.originalname
        cb(null,fileName);
    }
})

const filter=function(req,file,cb){
    const allowed =['.png','.jpg','.jpeg','.gif']
    const ext=path.extname(file.originalname).toLowerCase();
    if(allowed.includes(ext)){
        cb(null,true)
    }else{
        cb(new Error("File Type Not Accepted"),false)
    }
}


const upload=multer({
    storage:stroage,
fileFilter:filter,
limits:{
    fileSize:2*1024*1024
}
})

module.exports=upload