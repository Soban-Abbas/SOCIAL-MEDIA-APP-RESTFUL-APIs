const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
exports.postSignup = async (req, res, next) => {

  try {

    const Validationerror = validationResult(req);
    if (!Validationerror.isEmpty()) {

      let error = new Error("Validation Failed");
      error.status = 422;
      error.data = Validationerror.array();
      return next(error)
    }

    console.log("no any error ")

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const encryptedPassword = await bcrypt.hash(password, 10);




    const saveNewUser = await userModel.create({ email: email, password: encryptedPassword, user: name })
    console.log(saveNewUser)


    res.status(201).json({
      message: "User Register Successfully",
      newUse: saveNewUser
    })

  } catch (error) {
    next(error)
  }

}

exports.login=async(req,res,next)=>{
try {
  const email=req.body.email;
  const password=req.body.password.trim();
  const getUser=await userModel.findOne({email:email});
  if(!getUser){
    const error = new Error(" User not found with this email")
    error.status=401
   return next(error);
  }

  const comparePassword= await bcrypt.compare(password,getUser.password)
  if(!comparePassword){
    const error=new Error("Wrong Email or Password");
    error.status=401;
   return next(error);
  }

  const payload={
    userId: getUser._id,
    email: getUser.email,
    status:getUser.status

  }
  const token = jwt.sign(payload, `${process.env.jwt_secretKey}`,{expiresIn:'1h'});
  res.status(200).json({
    message:"Login Successful",
    token:token
  })

} catch (error) {
  next(error)
}
}
