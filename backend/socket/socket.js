import { Server } from "socket.io";
import http from 'http';
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [`${window.location.origin}`],
        methods: ['GET', 'POST']
    }
});

let userSocketMap = {} //{userid: socket.id}

export const getReceiverSocketId = (receiverId) => {
    return (userSocketMap[receiverId]);
}

io.on("connection", (socket) => {
    const userId= socket.handshake.query.userId;
    if(userId != "undefined"){
        userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    console.log("A user connected...: ",socket.id);
    socket.on("disconnect", () => {
        console.log("User disconnect: ", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export {app, io, server};