import jwt from "jsonwebtoken"
import "dotenv/config";
const authMiddleware=async(req,res,next)=>{
      const{token}=req.headers;
      if (!token){
        return res.json({success:false,message:"token is unauthorist"})
      }
      else{
        try {
           const token_decoded=jwt.verify(token,process.env.JWT_SECRET);
           req.userId=token_decoded.id;
           next();
        } catch (error) {
            console.log(error)
            res.json({success:false,message:"error"})
        }
      }
} 

export default authMiddleware;