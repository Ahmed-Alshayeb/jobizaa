import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { systemRoles } from "../../utils/generalFile.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as UEV from "./user_experience.validation.js";
import * as UEC from "./user_experience.controller.js";

const userExperienceRouter = Router();

// Get All User Educations
userExperienceRouter.get("/:id", auth(), validation(UEV.getExperienceValidation), UEC.getUserExperience);

// Add Education To User
userExperienceRouter.post("/add", auth(), validation(UEV.addExperienceValidation), UEC.addExperience);

// Remove Education From User
userExperienceRouter.delete(
  "/remove/:id",
  auth(),
  validation(UEV.removeExperienceValidation),
  UEC.removeExperience
);

export default userExperienceRouter;
