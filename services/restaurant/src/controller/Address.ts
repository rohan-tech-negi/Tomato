import { AuthenticatedRequest } from "../middleware/isAuth.js";
import TryCatch from "../middleware/trycatch.js";

export const addAddress = TryCatch(async(req:AuthenticatedRequest, res)=>{
    
})