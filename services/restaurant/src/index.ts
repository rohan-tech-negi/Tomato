import express from "express";
import connectDB from "./config/db.js";
import restaurantRoutes from "./routes/restaurant.js";
import dotenv from "dotenv";
import cors from "cors";
import itemRoutes from "./routes/menuItem.js"
import cartRoutes from "./routes/cart.js"
import addressRoutes from "./routes/Address.js"
import OrderRoutes from "./routes/Order.js"
import { connectRabbitMQ } from "./config/rabbitmq.js";
dotenv.config();

connectRabbitMQ()

const app = express();

const PORT = process.env.PORT || 5001;
app.use(cors())

app.use(express.json())


app.use("/api/restaurant", restaurantRoutes)
app.use("/api/item", itemRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/address", addressRoutes)
app.use("/api/order", OrderRoutes)

app.listen(PORT, () => {
    console.log(`Restaurent Server is running on port ${PORT}`);
    connectDB();    
});