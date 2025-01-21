import express, { Router } from "express";
import { } from "../Controller/user.js"
import { verifyToken } from "../verifytoken.js";
import { addVideo, addView, deleteVideo, getVideo, random, sub, trend, updateVideo, getByTag, search, savetoHistory } from "../Controller/video.js";
const router = express.Router();

// Add video
router.post("/", verifyToken, addVideo);

// update Video
router.put('/:id', verifyToken, updateVideo);

//update history of user
router.put('/history/:id', verifyToken, savetoHistory);

// delete Video
router.delete('/:id', verifyToken, deleteVideo);

// Get a video
router.get('/find/:id', getVideo);
router.put('/view/:id', addView);
router.get('/trend', trend);
router.get('/random', random);
router.get('/sub', verifyToken, sub);
router.get('/tags', getByTag);
router.get('/search', search);
// router.get('/history', history)


export default router;