import express from 'express'
import { isAuth, isSeller } from '../middleware/isAuth.js';
import { addRestaurant, fetchMyRestaurant } from '../controller/restaurant.js';
import upload from '../middleware/multer.js';

const router = express.Router()

router.post("/new", isAuth, isSeller, upload , addRestaurant)
router.get("/my", isAuth, isSeller, fetchMyRestaurant)

export default router;