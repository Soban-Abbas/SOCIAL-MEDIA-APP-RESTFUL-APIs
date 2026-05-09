const mongoose=require("mongoose");
const schema=mongoose.Schema
const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true
    } ,
    password:{
        type:String,
        required:true
    },
    user:{
        type :String,
        required:true
    },
    status:{
        type: String,
        required:true
    },
  posts:[{
    type:schema.Types.ObjectId,
    ref: 'post',
    required:true
  }]
},{timestamps:true});

module.exports=mongoose.model('user',userSchema)