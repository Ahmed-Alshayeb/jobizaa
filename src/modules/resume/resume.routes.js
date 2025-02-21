import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as RC from "./resume.controller.js";
import * as RV from "./resume.validation.js";
import { multerHost, validExtension } from "../../middlewares/upload.middleware.js";

const resumeRouter = Router();

// Get All Resumes For Profile
resumeRouter.get("/:profileId", auth(), validation(RV.getResumesValidation), RC.getResumes);

// Create Resume
resumeRouter.post(
  "/create",
  auth(),
  multerHost(validExtension.pdf).single("resume"),
  validation(RV.createResumeValidation),
  RC.createResume
);

// Delete Resume
resumeRouter.delete("/:id", auth(), validation(RV.deleteResumeValidation), RC.deleteResume);

export default resumeRouter;
