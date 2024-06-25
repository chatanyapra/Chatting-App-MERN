import asyncHandler from "express-async-handler";

// signup public
export const createUser = asyncHandler(async (req, res) => {
    // console.log("oookkk");
    res.status(200).json({message: "User Created"});
})

// login public
export const loginUser = asyncHandler(async (req, res) => {
    // console.log("oookkk");
    res.status(200).json({message: "User Loggedin"});
})

// logout public
export const logoutUser = asyncHandler(async (req, res) => {
    // console.log("oookkk");
    res.status(200).json({message: "User Logged OUT"});
})

