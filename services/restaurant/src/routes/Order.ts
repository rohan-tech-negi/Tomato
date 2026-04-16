import express from "express"
import { isAuth } from "../middleware/isAuth.js";
import { createOrder, fetchOrderForPayment } from "../controller/Order.js";

const router = express.Router()


router.post("/new", isAuth, createOrder)
router.post("/payment", fetchOrderForPayment)

export default router;