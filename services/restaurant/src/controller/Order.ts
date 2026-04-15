import { AuthenticatedRequest } from "../middleware/isAuth.js";
import TryCatch from "../middleware/trycatch.js";
import Address from "../models/Address.js";
import Cart from "../models/Cart.js";
import { IMenuItems } from "../models/MenuItems.js";
import Restaurant, { Irestaurant } from "../models/Restaurant.js";

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

    const cartItems = await Cart.find({
        userId: user._id
    }).populate<{itemId: IMenuItems, restaurantId: Irestaurant}>("itemId").populate("restaurantId")

    if(cartItems.length === 0){
        return res.status(400).json({
            message: "cart is empty"
        })
    }

    const firstCartItem = cartItems[0]

    if(!firstCartItem || !firstCartItem.restaurantId){
         return res.status(400).json({
            message: "Invalid card data"
         })   
    }

    const restaurantId = firstCartItem.restaurantId._id;
    const restaurantName = await Restaurant.findById(restaurantId)
    

    if(!restaurantName){
        return res.status(404).json({
            message: "Restaurant not found"
        })
    }

    
})