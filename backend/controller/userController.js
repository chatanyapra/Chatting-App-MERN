import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const getUserForSidebar = asyncHandler(async(req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers= await User.find().select("-password");
    
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in UserController", error.message);
        res.status(500).json({error: "Internal Server Error!"});
    }

});
