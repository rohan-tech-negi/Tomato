import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { addCart, fetchMyCart } from "../controller/cart.js";

const router = express.Router()

router.post("/add", isAuth, addCart)
router.get("/all", isAuth, fetchMyCart)

export default router;