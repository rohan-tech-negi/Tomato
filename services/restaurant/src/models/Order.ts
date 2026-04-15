import mongoose, {Schema, Document} from "mongoose";


export interface IOrder extends Document{
    userId: string;
    restaurantId: string;
    restaurantName: string;
    riderId? : string | null;
    riderPhone: number | null;
    riderName: string | null;
    distance: number;
    riderAmount: number

    items:{
        itemId: string;
        name: string,
        price: number;
        quantity: number;
    }[];

    subtotal: number
    deliveryFee: number;
    platformFee: number;

    totalAmount: number;

    addressId: string;

    deliveryAddress:{
        formattedAddress: string;
        mobile: number;
        latitude: number;
        longitude: number
    }

    status: | "placed" | "accepted" | "preparing" | "ready_for_rider" | "rider_assigned" | "picked_up" | "delivered" | "cancelled";

    paymentMethod: "razorpay" | "stripe" ;

    
    paymentStatus: "pending" | "paid" | "failed";

    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    
}

