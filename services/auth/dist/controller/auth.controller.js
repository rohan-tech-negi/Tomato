// import {Request, Response} from "express"
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import TryCatch from "../middleware/trycatch.js";
export const loginUser = TryCatch(async (req, res) => {
    const { email, name, picture } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({
            email,
            name,
            image: picture,
        });
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });
    res.status(200).json({
        message: "Logged Success",
        token,
        user,
    });
});
const allowedRoles = ["customer", "rider", "seller"];
export const addUserRole = TryCatch(async (req, res) => {
    if (!req.user?._id) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    const { role } = req.body;
    if (!allowedRoles.includes(role)) {
        return res.status(400).json({
            message: "Invalid role"
        });
    }
});
