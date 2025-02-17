//middleware to protect routes

import jwt from "jsonwebtoken";

const protectRoute = async(req,res,next)=>{
    // get token from header
   const token = req.header("Authorisation");

   // check if token is present
   if(!token){
    return res.status(401).json({message:"Unauthorized, Access deined"})
   }

   try{
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user to request
    req.user = decoded;
    // proceed to next middleware
    next();
   }catch(error){
    res.status(401).json({message:"Invalid token"});
   }
}

export default protectRoute;