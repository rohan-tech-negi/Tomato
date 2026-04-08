import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { addCart, fetchMyCart, incrementCartItem , decrementCartItem, clearCart} from "../controller/cart.js";

const router = express.Router()

router.post("/add", isAuth, addCart)
router.get("/all", isAuth, fetchMyCart)
router.put("/inc", isAuth, incrementCartItem)
router.put("/dec", isAuth, decrementCartItem)
router.delete("/clear", isAuth, clearCart)


export default router;