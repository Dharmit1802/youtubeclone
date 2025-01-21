import express, { Router } from "express";
import { } from "../Controller/user.js";
import { verifyToken } from "../verifytoken.js"
import { update, deleteUser, getUser, subscribe, unsubscribe, like, dislikes, views, getHistory } from "../Controller/user.js";

const router = express.Router();

//update
router.put("/:id", verifyToken, update);

//delete
router.delete("/:id", verifyToken, deleteUser);

//get history
router.get("/history", verifyToken, getHistory);

//get user
router.get("/find/:id", getUser);

// subscribe user
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe user
router.put("/unsub/:id", verifyToken, unsubscribe);

//Like
router.put("/like/:videoId", verifyToken, like);

//dislike
router.put("/dislike/:videoId", verifyToken, dislikes);

//views
router.put("/view/:videoId", views);


export default router;