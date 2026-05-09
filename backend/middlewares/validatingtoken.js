const jwt=require("jsonwebtoken")

exports.validateToken=(req,res,next)=>{
    
    let authHeader = req.headers['authorization'];
    let token=authHeader && authHeader.split(' ')[1];
    if(!token){
        const error = new Error("Unauthorized : No token provided");
        error.status=401
      return   next(error)
     
    }

    try {
        
        const decode = jwt.verify(token, `${process.env.jwt_secretKey}`)
        req.user=decode
        next()


    } catch (error) {
        error.status=403;
        error.message="Forbidden: Invalida or Expire Token"
    }

}