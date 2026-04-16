import {Request, Response} from "express"


export const createRazorpayOrder = async(req:Request, res: Response)=>{
    const {orderId} = req.body

    const {data} = await 
}