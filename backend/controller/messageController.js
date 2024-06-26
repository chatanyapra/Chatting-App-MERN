import asyncHandler from "express-async-handler";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js"

export const sendMessage = asyncHandler( async(req, res) => {
    try {
        res.status(201).json({message: "Message send!"});
        // const {message} = req.body;
        // const {id: receiverId} = req.params;
        // const senderId= req.user._id;

        // let conversation = await Conversation.findOne({
        //     participants:{$all: [senderId, receiverId]}
        // })
        // if(!conversation){
        //     conversation = await Conversation.create({
        //         participants: [senderId, receiverId]
        //     })
        // }
        // const newMessage = new Message({
        //     senderId,
        //     receiverId,
        //     message
        // })
        // if(newMessage){
        //     conversation.messages.push(newMessage._id);
        // }
        // await Promise.all([conversation.save(), newMessage.save()]);

        // res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in Message Controller", error.message);
        res.status(400).json({message: "Internal Server Error!"});
    }
    const receiverId = req.params.id;
    res.status(201).json({message: `Message sended! ${receiverId}`});
})