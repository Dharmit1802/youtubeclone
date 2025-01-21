import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: false
    },
    videoId: {
        type: String,
        required: true,
        unique: false
    },
    desc: {
        type: String,
        required: true,
    }

}, { timestamps: true })

export default mongoose.model("Comment", CommentSchema)