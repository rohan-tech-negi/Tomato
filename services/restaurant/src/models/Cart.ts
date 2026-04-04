import mongoose, {Schema, Document} from "mongoose";

export interface Icart extends Document{
    userId: mongoose.Types.ObjectId
}