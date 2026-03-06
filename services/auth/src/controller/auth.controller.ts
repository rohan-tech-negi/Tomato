// import {Request, Response} from "express"
import User from "../model/User.js"
import jwt from "jsonwebtoken"
import TryCatch from "../middleware/trycatch.js"
import { AuthenticatedRequest } from "../middleware/isAuth.js"

export const loginUser = TryCatch(async (req,res)=>{
    const {email , name, picture} = req.body
        
        let user = await User.findOne({email})  

        if(!user){
            user = await User.create({
                email,
                name,
                image: picture,   
            })
        }

        const token = jwt.sign({user},process.env.JWT_SECRET as string, {
            expiresIn: "15d"
        })

        res.status(200).json({
            message: "Logged Success",
            token,
            user,
        })
})

const allowedRoles = ["customer" , "rider" , "seller"] as coonst;
type Role = (typeof allowedRoles)[number];


export const addUserRole = TryCatch(async (req: AuthenticatedRequest, res)=>{
    if(!requser?.)
})