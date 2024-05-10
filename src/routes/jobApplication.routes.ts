import express from "express";
import { postJobApplication } from "../controller/jobApplication.controller";
const jobApplicationRouter = express.Router();

jobApplicationRouter.route("/").post(postJobApplication);

export default jobApplicationRouter;
