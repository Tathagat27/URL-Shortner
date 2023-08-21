import express from "express";
import path from 'path';
import { connectToMongoDB } from "./connect.js";
import * as dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import { router as urlRoute } from "./routes/url.js";
import { router as staticRoute } from "./routes/staticRouter.js";
import { router as userRoute } from "./routes/user.js";
import { checkAuth, restrictToLoggedInUserOnly } from "./middlewares/auth.js";

const app = express();

dotenv.config();

connectToMongoDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
