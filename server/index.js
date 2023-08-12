import express from "express";
import { router as urlRoute } from "./routes/url";
import { connectToMongoDB } from "./connect";

const app = express();
const PORT = 8001;

connectToMongoDB("")

app.use("/url", urlRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})