import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import loginRoute from "./src/routes/login.routes";
import signupRoute from "./src/routes/signup.route";
import jobRoute from "./src/routes/job.routes";
import jobApplicationRouter from "./src/routes/jobApplication.routes";

//create instance of express
const app = express();

//add middleware for parsing req data

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(morgan("dev"));

//routes middleware
app.use("/api/login", loginRoute);
app.use("/api/signup", signupRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/applications", jobApplicationRouter);
export default app;
