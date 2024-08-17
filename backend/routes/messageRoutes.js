import express from "express";
import {getMessages, sendMessage, sendAuramicAiMessage} from "../controller/messageController.js";
import protectRoute from "../middleware/protectRoute.js";
import upload from "../middleware/fileUpload.js"
const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, upload.single('file'), sendMessage);
router.post("/sendAuramicAi/:id", protectRoute, upload.single('file'), sendAuramicAiMessage);

export default router;