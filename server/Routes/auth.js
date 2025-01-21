import express, { Router } from "express";
import { } from "../Controller/user.js"
import { signup, signin, googleAuth } from "../Controller/auth.js"

const router = express.Router();

// create a new user
router.post('/signup', signup);

// login existing user
router.post('/signin', signin)

// Google authentication
router.post("/google", googleAuth)
export default router;