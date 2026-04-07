import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { addCart } from "../controller/cart.js";

const router = express.Router()

router.post("/add", isAuth, addCart)

export default router;