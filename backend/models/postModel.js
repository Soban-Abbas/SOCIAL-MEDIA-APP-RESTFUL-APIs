const mongoose=require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    } ,
    content:{
        type:String,
        required:true
    },
    image:{
        type :String,
        required:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    }

},{timestamps:true});

module.exports=mongoose.model('post',postSchema)