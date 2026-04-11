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
    
})