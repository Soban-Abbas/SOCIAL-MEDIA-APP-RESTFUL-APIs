const express=require("express");
const router=express.Router();
const userModel=require("../models/userModel")
const {check}=require("express-validator")
const authController=require("../controllers/authController")
router.post('/signup',
    
   [ check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must b a Valid Email")
    .bail()
    .custom(async(email)=>{

        const existingUser=await userModel.findOne({email:email});
        if(existingUser){
            throw new Error("Email in Use")
        }
        return true ;
    }),
    check("password")
    .trim()
    .isLength({min:4,max:20})
    .withMessage("Password must b 4 and 20 characters "),

    check("confirmPassword")
    .trim()
    .isLength({min:4,max:20})
        .withMessage("Password must b 4 and 20 characters ")
      .custom((confirmPassword,{req})=>{
        if(confirmPassword!==req.body.password){
            throw new Error("password must Match")
        }
        return true;
      }),


      check("name")
      .trim()
      .isLength({min:3, max:20})
      .withMessage("Enter Proper Name")
    ]
    
    
    
    
    
    
    ,authController.postSignup)
module.exports=router