import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSidebar, auramicaiTextExtract } from "../controller/userController.js";

const router = express.Router();

router.get("/", protectRoute, getUserForSidebar)


router.post("/extract-text", protectRoute, auramicaiTextExtract)

// router.get("/conversation", protectRoute, auramicaiConversation)


export default router;