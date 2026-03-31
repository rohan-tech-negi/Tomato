import express from "express"
import { isAuth, isSeller } from "../middleware/isAuth.js";
import { addMenuItem, deleteMenuItem, toggleMenuItemAvailability } from "../controller/MenuItem.js";

const router = express.Router()

router.post('/new', isAuth, isSeller, addMenuItem)
router.get('/all/:id', isAuth, addMenuItem)
router.delete("/:id", isAuth, isSeller, deleteMenuItem)
router.delete("/status/:id", isAuth, isSeller, toggleMenuItemAvailability)

export default router;