import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// signup public
export const createUser = asyncHandler(async (req, res) => {
    try {
        const {username, fullname, password, confirmPassword, gender} = req.body;
        if(!username || !fullname || !password || !confirmPassword || !gender){
            return res.status(400).json({error: "All fields are mandatory!"});
        }
        if(confirmPassword !== password){
            return res.status(400).json({error: "Password don't match!"});
        }
        const user = await User.findOne({username});
        if(user){
            res.status(400).json({error: "User already exist!"});
        }
        
        // profile pics
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy/?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/boy/?username=${username}`;
        // password hashing
        const hashedPassword= await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const newUser= new User({
            fullname,
            username, 
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })
        if(newUser){
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                fullname: newUser.fullname,
                profilePic: newUser.profilePic
            })
        }else{
            res.status(400).json({error: "Invalid user data"});
        }
        
        res.status(200).json({message: "User Created"});
    } catch (error) { 
        console.log("Error in Signup COntroller", error.message);
        res.status(500).json({message: "Internal Server Error!"});
    }
})

// login public
export const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: "User Loggedin"});
})

// logout public
export const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: "User Logged OUT"});
})

