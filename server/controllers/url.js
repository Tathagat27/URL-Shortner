import shortid from "shortid";
import { URL } from "../models/url.js";

export const handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;

    if(!body.url) return res.status(400).json({ error: "url is required" })

    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    })

    return res.render('home', {
        id: shortId,
    })
    // return res.json({ id: shortId });
}

export const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}