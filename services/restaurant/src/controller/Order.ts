import { AuthenticatedRequest } from "../middleware/isAuth.js";
import TryCatch from "../middleware/trycatch.js";
import Address from "../models/Address.js";

export const createOrder = TryCatch(async(req:AuthenticatedRequest, res)=>{
    const user = req.user;

    if(!user){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const {paymentMethod, addressId} = req.body
    if(!addressId){
        return res.status(400).json({
            message: "Address is required"
        })
    }

    const address = await Address.findOne({
        _id: addressId,
        userId: user._id,
    })

    if(!address){
        return res.status(404).json({
            message: " Address not found"
        })
    }

    const 
})