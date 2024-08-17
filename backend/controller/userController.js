import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import vision from '@google-cloud/vision';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { sendAuramicAiMessage } from "./messageController.js";


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
        const auramicAiId= "66c048e50d7696b4b17b5d53"
        let { image, question } = req.body;
        console.log("image, question  ----", image, question);
        
        if (question !== "") {
            question = "Your name is AuramicAi and you are developed by Chaitanya Pratap. Your features include extracting content from images and answering questions based on the input. The input question is: " + question;
            if (image !== null) {
                question += ". Answer from the given image's content: ";
            }
        }
        console.log("question:------", question);

        let extractedText = "";
        if (image !== null) {
            const imageBuffer = Buffer.from(image.split(',')[1], 'base64');
            console.log("imageBuffer------ ", imageBuffer);
            
            // Extract text from the image
            const [result] = await client.textDetection(imageBuffer);
            const detections = result.textAnnotations;
            extractedText = detections[0]?.description;
            console.log("extractedText:", extractedText);
            if (!extractedText || extractedText === "") {
                return res.status(400).json({ error: 'No text detected in the image' });
            }
        }

        // Generate content using the Google Generative AI model
        const model = await genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });
        const prompt = question + extractedText;
        console.log("prompt---  ", prompt);
        
        const generationResult = await model.generateContent(prompt);
        const responseText = await generationResult.response.text();
        if(responseText){
            const responseMessage = await sendAuramicAiMessage({ image, question, userId:auramicAiId })
        
            const data = await responseMessage.json();
            console.log('Server response:--:--: ', data);
        }
        console.log("responseText:", responseText);
        res.json({ response: responseText });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: error.toString() });
    }
});
