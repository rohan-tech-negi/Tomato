import express from 'express'
import { isAuth, isSeller } from '../middleware/isAuth.js';
import { addRestaurant, fetchMyRestaurant, updateRestaurant, updateStatusRestaurant } from '../controller/restaurant.js';
import upload from '../middleware/multer.js';

const router = express.Router()

router.post("/new", isAuth, isSeller, upload , addRestaurant)
router.get("/my", isAuth, isSeller, fetchMyRestaurant)
router.put("/status", isAuth, isSeller, updateStatusRestaurant)
router.put("/edit", isAuth, isSeller, updateRestaurant)
export default router;