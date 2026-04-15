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

const OrderSchema = new Schema<IOrder>({
    userId:{
        type: String,
        required: true,
        index: true
    },
    restaurantId:{
        type: String,
        required: true,
        index: true
    },
    restaurantName:{
        type: String,
        required: true
    },
    riderId:{
        type: String,
        default: null,
        index: true
    },
    riderPhone:{
        type: Number,
        default: null
    },
    riderName:{
        type: String,
        default: null
    },
    distance:{
        type: Number,
        required: true
    },
    riderAmount:{
        type: Number,
        required: true
    },
    items:{
        type: Array,
        required: true
    },
    subtotal:{
        type: Number,
        required: true
    },
    deliveryFee:{
        type: Number,
        required: true
    },
    platformFee:{
        type: Number,
        required: true
    },
    totalAmount:{
        type: Number,
        required: true
    },
    addressId:{
        type: String,
        required: true
    },
    deliveryAddress:{
        type: Object,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    paymentMethod:{
        type: String,
        required: true
    },
    paymentStatus:{
        type: String,
        required: true
    },
    expiresAt:{
        type: Date,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    },
    updatedAt:{
        type: Date,
        required: true
    }
}, {timestamps: true})

export default mongoose.model<IOrder>("Order", OrderSchema)