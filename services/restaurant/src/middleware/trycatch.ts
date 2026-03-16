import { Request, Response, RequestHandler, NextFunction } from "express";

const TryCatch= (handler: RequestHandler) : RequestHandler =>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        try {
            await handler(req,res,next);
        } catch (error: any) {
            console.error("TRYCATCH ERROR:", error.response?.data || error.message || error);
            res.status(500).json({
                message: error.response?.data?.message || error.message || String(error),
                success: false,
            })
        }
    }
}

export default TryCatch