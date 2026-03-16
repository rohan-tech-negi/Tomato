import { AuthenticatedRequest } from "../middleware/isAuth.js";
import TryCatch from "../middleware/trycatch.js";
import Restaurant from "../models/Restaurant.js";

export const addRestaurant = TryCatch(async(req:AuthenticatedRequest,res)=>{
    const user = req.user;

    if(!user){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const existingRestaurant = await Restaurant.findOne({
        ownerId: user._id,
    })

    if(existingRestaurant){
        return res.status(400).json({
            message: "You already have a restaurant",
        })
    }

    const {name, description, latitude, longitude, formattedAddress, phone} = req.body;

    if(!name || !latitude || !longitude){
        return res.status(400).json({
            message: "Please provide all the required fields",
        })
    }
})