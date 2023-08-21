import express from "express";
import { handleGenerateNewShortURL, handleGetAnalytics, handleRedirect } from "../controllers/url.js";

export const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/:shortId", handleRedirect);  

router.get('/analytics/:shortId', handleGetAnalytics);