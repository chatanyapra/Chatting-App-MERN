import express from "express";
import {createUser, loginUser, logoutUser} from "../controller/authController.js";
const router = express.Router();

router.get("/signup", createUser)
router.get("/login", loginUser)
router.get("/logout", logoutUser)

export default router;