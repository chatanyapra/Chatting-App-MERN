import express from "express";
import dotenv from "dotenv";
import connectMongoose from "./dbConnection/dbConnection.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 5001;

dotenv.config();
app.use(express.json());
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// })

app.use("/api/auth", authRoutes);

app.listen(port, () => {
    connectMongoose();
    console.log(`Server running on port ${port}`);
})