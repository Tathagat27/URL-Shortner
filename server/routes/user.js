import express from "express";
import { handleUserLogin, handleUserSignup } from "../controllers/user.js";

export const router = express.Router();

router.post('/', handleUserSignup);
router.post('/login', handleUserLogin);