import { AuthenticatedRequest } from "../middleware/isAuth.js";
import TryCatch from "../middleware/trycatch.js";

export const addRestaurant = TryCatch(async(req:AuthenticatedRequest,res)=>{
    const user = req.user;

    
})