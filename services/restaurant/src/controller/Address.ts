import { AuthenticatedRequest } from "../middleware/isAuth.js";
import TryCatch from "../middleware/trycatch.js";
import Address from "../models/Address.js";

export const addAddress = TryCatch(async(req:AuthenticatedRequest, res)=>{
    const user = req.user
    if(!user){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const {mobile, formatterAddress, latitude, longitude} = req.body;

    if(!mobile || !formatterAddress || latitude===undefined || longitude===undefined){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const newAddress = await Address.create({
        userId: user._id.toString(),
        mobile,
        formatterAddress,
        location: {
            type: "Point",
            coordinates: [Number(longitude), Number(latitude)]
        }
    })

    return res.status(201).json({
        message: "Address added successfully",
        address: newAddress
    })
})