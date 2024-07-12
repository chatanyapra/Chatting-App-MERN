import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectMongoose from "./dbConnection/dbConnection.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { app, server } from "./socket/socket.js";

const port = process.env.PORT || 5001;

dotenv.config();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users/", userRoutes);

server.listen(port, () => {
    connectMongoose();
    console.log(`Server running on port ${port}`);
})