import express, { Router } from "express";
import { } from "../Controller/user.js"
import { verifyToken } from "../verifytoken.js"
import { addComment, deleteComment, getComments } from "../Controller/comment.js"

const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);

export default router;