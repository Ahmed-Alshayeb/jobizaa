import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as PC from "./profile.controller.js";
import * as PV from "./profile.validation.js";
import { multerHost, validExtension } from "../../middlewares/upload.middleware.js";

const profileRouter = Router();

// Get All Profiles For User
profileRouter.get("/", auth(), PC.getProfiles);

// Get Specific Profile
profileRouter.get("/:id", validation(PV.getProfileValidation), PC.getProfile);

// Create Category
profileRouter.post(
  "/create",
  auth(),
  multerHost(validExtension.image).single("image"),
  validation(PV.createProfileValidation),
  PC.createProfile
);

// Update Skill
profileRouter.patch(
  "/:id",
  auth(),
  multerHost(validExtension.image).single("image"),
  validation(PV.updateProfileValidation),
  PC.updateProfile
);

// Delete Skill
profileRouter.delete("/:id", auth(), validation(PV.deleteProfileValidation), PC.deleteProfile);

export default profileRouter;
