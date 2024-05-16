import express from "express";
import {
  postJobApplication,
  upload,
} from "../controller/jobApplication.controller";
const jobApplicationRouter = express.Router();

jobApplicationRouter.route("/").post(upload.single("cv"), postJobApplication);

export default jobApplicationRouter;
