import express from "express"
import { addUserRole, loginUser } from "../controller/auth.controller.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/login", loginUser)
router.put("/add/role", isAuth, addUserRole)

export default router;