import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as AC from "./application.controller.js";
import * as AV from "./application.validation.js";

const applicationRouter = Router();

// Get All Applications
applicationRouter.get("/", auth(), AC.getApplications);

// Get Single Application
applicationRouter.get("/:id", auth(), validation(AV.getApplicationValidation), AC.getApplication);

// Create Application
applicationRouter.post("/create", auth(), validation(AV.createApplicationValidation), AC.createApplication);

// Get All Applications For Profile
applicationRouter.get(
  "/profile/:profileId",
  auth(),
  validation(AV.getProfileApplicationsValidation),
  AC.getProfileApplications
);

// Get All Applications For Job
applicationRouter.get(
  "/job/:jobId",
  auth(),
  validation(AV.getJobApplicationsValidation),
  AC.getJobApplications
);

// Update Application
applicationRouter.patch("/:id", auth(), validation(AV.updateApplicationValidation), AC.updateApplication);

// Delete Application
applicationRouter.delete("/:id", auth(), validation(AV.deleteApplicationValidation), AC.deleteApplication);

export default applicationRouter;
