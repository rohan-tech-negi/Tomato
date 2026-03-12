import mongoose, {Schema, Document} from "mongoose";

export interface Irestaurant extends Document{
    name: string;
    description: string;
    image: string;
    ownerId: string;
    phone: number;
    isVarified: boolean;

    autoLocation: {
        type: "Point",
        coordinates: [number, number];
        formattedAddress: string; 
    };
    isOpen: boolean;
    createdAt: Date;
}


const schema = new Schema<Irestaurant>({
    name: {type: String, required: true, trim: true},
    description: {type: String},
    image: {type: String, required: true},
    ownerId: {type: String, required: true},
    phone: {type: Number, required: true},
    isVarified: {type: Boolean, default: true},
    autoLocation: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
        formattedAddress: {type: String}
    },
    isOpen: {type: Boolean, default: false},
    
}, {timestamps: true});

schema.index({autoLocation: "2dsphere"});

export default mongoose.model<Irestaurant>("Restaurant", schema);
