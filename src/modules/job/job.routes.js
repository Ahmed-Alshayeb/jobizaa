import { Router } from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import * as JC from "./job.controller.js";
import * as JV from "./job.validation.js";

const jobRouter = Router();

// Get All Jobs
jobRouter.get("/", JC.getJobs);

// Get Single Job
jobRouter.get("/:id", validation(JV.getJobValidation), JC.getJob);

// Get All Jobs For Company
jobRouter.get("/company/:companyId", JC.getCompanyJobs);

// Create Job
jobRouter.post("/create", validation(JV.createJobValidation), JC.createJob);

// Update Job
jobRouter.patch("/:id", validation(JV.updateJobValidation), JC.updateJob);

// Delete Job
jobRouter.delete("/:id", validation(JV.deleteJobValidation), JC.deleteJob);

export default jobRouter;
