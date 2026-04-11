import mongoose, { Schema , Document} from "mongoose";



export interface IAddress extends Document {
    userId : string;
    mobile: number;
    
    formatterAddress : string;

    location: {
        type: "Point",
        coordinates: [number, number]
    }

    createdAt: Date;
    updatedAt: Date;
}

const addressSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    formatterAddress:{
        type: String,
        required: true
    },
    location:{
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates:{
            type: [Number],
            required: true
        }
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})