import express from "express";
import { router as urlRoute } from "./routes/url.js";
import { connectToMongoDB } from "./connect.js";
import * as dotenv from "dotenv";
import { URL } from "./models/url.js";

const app = express();

dotenv.config();

connectToMongoDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
            timestamp: Date.now(),
        }
      },
    }
  );

  res.redirect(entry.redirectURL);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
