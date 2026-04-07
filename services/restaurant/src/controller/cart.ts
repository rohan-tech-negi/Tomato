import { AuthenticatedRequest } from "../middleware/isAuth.js";
import TryCatch from "../middleware/trycatch.js";

export const addCart = TryCatch(async(req:AuthenticatedRequest, res)=>{
    if(!req.user){
        return res.status(401).json({
            message:"Please login"
        })
    }

    const userId = req.user._id;

    const {restaurantId, itemId} = req.body
})