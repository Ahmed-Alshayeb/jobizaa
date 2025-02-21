import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { systemRoles } from "../../utils/generalFile.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as UEC from "./user_education.controller.js";
import * as UEV from "./user_education.validation.js";

const userEducationRouter = Router();

// Get All User Educations
userEducationRouter.get("/:id", auth(), validation(UEV.getUserEducationValidation), UEC.getUserEducation);

// Add Education To User
userEducationRouter.post("/add", auth(), validation(UEV.addEducationValidation), UEC.addEducation);

// Remove Education From User
userEducationRouter.delete(
  "/remove/:id",
  auth(),
  validation(UEV.removeEducationValidation),
  UEC.removeEducation
);

export default userEducationRouter;
