import { AuthenticatedRequest } from "../middleware/isAuth.js";
import TryCatch from "../middleware/trycatch.js";
import Address from "../models/Address.js";
import Cart from "../models/Cart.js";
import { IMenuItems } from "../models/MenuItems.js";
import Order from "../models/Order.js";
import Restaurant, { Irestaurant } from "../models/Restaurant.js";

export const createOrder = TryCatch(async(req:AuthenticatedRequest, res)=>{
    const user = req.user;

    if(!user){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const {paymentMethod, addressId, distance} = req.body
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
    const restaurant = await Restaurant.findById(restaurantId)


    if(!restaurant){
        return res.status(404).json({
            message: "Restaurant not found"
        })
    }


    if(!restaurant.isOpen){
        return res.status(404).json({
            message: "Sorry this reaturant is closed for now"
        })
    }

    let subtotal = 0;
    const orderItem = cartItems.map((cart)=>{
        const item = cart.itemId;
        if(!item){
            throw new Error("Invalid cart item")
        }

        const itemTotal = item.price * cart.quantity;
        subtotal += itemTotal;

        return {
            itemId: item._id.toString(),
            name: item.name,
            price: item.price,
            quantity: cart.quantity
        }
    })

    const deliveryFee = subtotal < 250 ? 40 : 0;
    const platformFee = 7;

    const totalAmount = subtotal + deliveryFee + platformFee;

    const expiresAt = new Date(Date.now() + 15 * 60 *1000)

    const [longitude, latitude] = address.location.coordinates;

    const riderAmount = Math.ceil(distance) * 17


    const order = await Order.create({
        userId: user._id.toString(),
        restaurantId: restaurant.toString(),
        restaurantName: restaurant.name,
        riderId: null,
        riderPhone: null,
        riderName: null,
        distance: 0,
        riderAmount,
        items: orderItem,
        subtotal,
        deliveryFee,
        platformFee,
        totalAmount,
        addressId: address._id.toString(),
        deliveryAddress: {
            formattedAddress: address.formattedAddress,
            mobile: address.mobile,
            latitude,
            longitude
        },
        paymentMethod,
        paymentStatus: "pending",
        status: "pending",
        expiresAt
    })

    await Cart.deleteMany({
        userId: user._id
    })

    return res.status(201).json({
        message: "Order created successfully",
        order
    })



    
})