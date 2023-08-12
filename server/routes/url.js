import express from "express";
import { handleGenerateNewShortURL } from "../controllers/url";

export const router = express.Router();

router.post("/", handleGenerateNewShortURL);