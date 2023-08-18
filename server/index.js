import express from "express";
import path from 'path';
import { router as urlRoute } from "./routes/url.js";
import { connectToMongoDB } from "./connect.js";
import * as dotenv from "dotenv";
import { URL } from "./models/url.js";
import { router as staticRouter } from "./routes/staticRouter.js";

const app = express();

dotenv.config();

connectToMongoDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);

app.use('/', staticRouter);

app.get("/url/:shortId", async (req, res) => {
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
