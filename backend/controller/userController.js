import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import vision from '@google-cloud/vision';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js"
import { io } from '../socket/socket.js';
import cloudinary from '../cloudinary/cloudinaryConfig.js';
import fs from 'fs';
import { getReceiverSocketId } from "../socket/socket.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const client = new vision.ImageAnnotatorClient({
    keyFilename: path.resolve(__dirname, '../config/api-learn-432706-d6966a1d489e.json')
});

const apiKey = process.env.GEMINI_API_KEY || "AIzaSyBogLPBdn-n_-pCI5Cz5fdacYEEkYoIDmM";
const genAI = new GoogleGenerativeAI(apiKey);

export const getUserForSidebar = asyncHandler(async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json({ filteredUsers, hasSpecificId: "66c048e50d7696b4b17b5d53" });
    } catch (error) {
        console.error("Error in UserController", error.message);
        res.status(500).json({ error: "Internal Server Error!" });
    }
});
export const auramicaiTextExtract = asyncHandler(async (req, res) => {
    try {
        let { message:question } = req.body;
        const image = req.file;

        const receiverId = req.user._id;
        // console.log("image, question receiverId ----", image, question, receiverId);

        if (question !== "") {
            question = `If you have any questions or need assistance or about you, just let me know! I’m AuramicAi, a chatbot created by Chatanya Pratap. My main job is to extract text from images
             and help you find answers based on that question. Simply upload an image with question, and I’ll do my best to provide the information you need. Feel free to ask me anything 
             related to the text in the image!. the user input question is : ` + question + `. Answer the user input question from the given image's content or previous result from you as required.`;
        }
        // console.log("question:------", question);

        if (question.length > 3000) {
            return res.status(400).json({ error: 'String length exceeds 3000 characters' });
        }
        let extractedText = "";
        if (req.file) {
            const imageBuffer = fs.readFileSync(image.path);
            
            const [result] = await client.textDetection(imageBuffer);
            const detections = result.textAnnotations;
            extractedText = detections[0]?.description;
            // console.log("extractedText:", extractedText);
            if (!extractedText || extractedText === "") {
                return res.status(400).json({ error: 'No text detected in the image' });
            }
        }

        const model = await genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });
        const prompt = question + extractedText;
        // console.log("prompt---  ", prompt);
        
        const generationResult = await model.generateContent(prompt);
        const responseText = await generationResult.response.text();
        if (responseText) {
            const sendMessageResponse = await sendAuramicDb(responseText, image, receiverId);

            const newMessage = sendMessageResponse.newMessage;
            // console.log("responseText:", newMessage);
            res.json({ response: newMessage });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: error.toString() });
    }
});

const sendAuramicDb = async (message, image, receiverId) => {
    try {
        const senderId = "66c048e50d7696b4b17b5d53";
        // console.log("message, image, receiverId---sendAuramicDb***********", message, image, receiverId);
        
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        let fileUrl = null;
        if (image) {

            const stats = fs.statSync(image.path);
            const imageSizeInMB = stats.size / (1024 * 1024);
            const maxSizeInMB = 5;
            // console.log("stats= statSync(image.path);", stats);
            
            if (imageSizeInMB > maxSizeInMB) {
                throw new Error(`Image size exceeds the ${maxSizeInMB}MB limit.`);
            }
            

            const result = await cloudinary.uploader.upload(image.path, {
                resource_type: "image"
            });
            fileUrl = result.secure_url;
            // console.log("fileUrl -- ", fileUrl);
            
            fs.unlink(image.path, (err) => {
                if (err) {
                    console.error('Error deleting the file from the server:', err);
                }
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        // Emit socket event for live messages
        const receiverSocketId = getReceiverSocketId(receiverId);
        // console.log("receiverSocketId ------  ", receiverSocketId);
        
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return { newMessage };

    } catch (error) {
        console.error("Error in Message Controller", error.message);
        throw new Error("Internal Server Error!");
    }
};

