import {NextFunction, Request, Response, } from "express"
import  Jwt , {JwtPayload}  from "jsonwebtoken"

export interface IUser {
    _id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    image: string,
}


export interface AuthenticatedRequest extends Request{
    user? : IUser | null;
}

export const isAuth = async(req:AuthenticatedRequest, res:Response, next:NextFunction): Promise<void>=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer")){
            res.status(401).json({
                message: "Unauthorized",
                success: false,
            })

            return ;
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            res.status(401).json({
                message: "Please login  - token missing",
                success: false,
            })
            return;
        }

        const decodeValue = Jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        if(!decodeValue || !decodeValue.user){
            res.status(401).json({
                message: "Invalid token"
            })
            return;
        }

        req.user = decodeValue.user;
        next();
    } catch (error) {
        res.status(500).json({
            message:"Please Login - Jwt error"
        })
    }
}

export const isSeller = async(req:AuthenticatedRequest, res:Response, next:NextFunction): Promise<void>=>{
    const user = req.user;

    if(user && user.role !== "seller"){
        res.status(401).json({
            message: "your are not authorized seller"
        })
        return ;
    }

    next();
}
