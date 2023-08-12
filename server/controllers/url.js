import { nanoid } from "nanoid"
import { URL } from "../models/url";

export const handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;

    if(!body.url) return res.status(400).json({ error: "url is required" })

    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    })

    return res.json({ id: shortId });
}