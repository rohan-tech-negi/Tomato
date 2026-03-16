import express from 'express'
import { isAuth, isSeller } from '../middleware/isAuth.js';
import { addRestaurant, fetchMyRestaurant } from '../controller/restaurant.js';

const router = express.Router()

router.post("/new", isAuth, isSeller, addRestaurant)
router.get("/my", isAuth, isSeller, fetchMyRestaurant)

export default router;