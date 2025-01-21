import Comment from "../Models/Comment.js"
import Video from "../Models/Video.js";

export const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id })
    try {
        const savedComment = await newComment.save();
        res.status(200).send(savedComment)
    } catch (error) {
        next(error);
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        if (comment.userId === req.user.id || video.userId === req.userId) {
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("comment has been deleted")
        } else {
            return res.status(404).json("you can delete only your video")
        }
    } catch (error) {
        next(error);
    }
}

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
        res.status(200).json(comments)
    } catch (error) {
        next(error);
    }
}