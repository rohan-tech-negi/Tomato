import mongoose, {Schema, Document} from "mongoose";


export interface IOrder extends Document{
    userId: string;
    restaurantId: string;
    restaurantName: string;
    riderId? : string | null;
    riderPhone: number | null;
    riderName: string | null;

    items:{
        itemId: string;
        name: string,
        price: number;
        quantity: number;
    }[];

    subtotal: number
    deliveryFee: number;
    platformFee
}