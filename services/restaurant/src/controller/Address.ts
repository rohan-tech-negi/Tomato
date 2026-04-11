import mongoose from "mongoose";
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


export const deleteAddress = TryCatch(async(req:AuthenticatedRequest, res)=>{
    const user = req.user
    if(!user){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const {id} = req.params;

    if(!id){
        return res.status(400).json({
            message: "id is required"
        })
    }

    const address = await Address.findOne({
    _id: id,
    userId: user._id.toString(),

    })

    if(!address){
        return res.status(404).json({
            message: "Address not found"
        })
    }

    await address.deleteOne()

    return res.status(200).json({
        message: "Address deleted successfully"
    })
})


export const getMyAddress = TryCatch(async(req:AuthenticatedRequest, res)=>{
    const user = req.user
    if(!user){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const addresses = await Address.find({
        userId: user._id.toString()
    })

    return res.status(200).json({
        message: "Addresses fetched successfully",
        addresses
    })
})