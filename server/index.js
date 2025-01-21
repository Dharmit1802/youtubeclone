import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRoutes from "./Routes/users.js"
import videoRoutes from "./Routes/videos.js"
import commentRoutes from "./Routes/comments.js"
import authRoutes from "./Routes/auth.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)

app.use((err, req, res, next) => {
    return res.status(500).json({
        success: false,
        message: err.message,
        status: 500
    })
})

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected successfully");
    }).catch((error) => console.log(error.message))
}

app.listen(8080, () => {
    connect();
    console.log("Connected");
})