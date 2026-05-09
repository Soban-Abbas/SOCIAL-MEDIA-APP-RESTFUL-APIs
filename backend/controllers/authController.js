const { validationResult }=require("express-validator")
exports.postSignup=(req,res,next)=>{

const Validationerror=validationResult(req);
if(!Validationerror.isEmpty()){
    console.log(Validationerror)
    let error=new Error("Validation Failed");
    error.status=422;
    error.data=Validationerror.array();
  return   next(error)
}

console.log("no any error ")

res.status(200).json({
    message:"Data send Correctly"
})

}


