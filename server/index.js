import express from "express";
import path from 'path';
import { connectToMongoDB } from "./connect.js";
import * as dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import { router as urlRoute } from "./routes/url.js";
import { router as staticRoute } from "./routes/staticRouter.js";
import { router as userRoute } from "./routes/user.js";
import { checkForAuthentication, restrictTo } from "./middlewares/auth.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8001

connectToMongoDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(['NORMAL']), urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
