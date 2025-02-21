import { Router } from "express";
import * as UC from "./user.controller.js";
import * as UV from "./user.validation.js";
import { auth } from "../../middlewares/auth.middleware.js";
import {} from "../../utils/generalFile.js";
import { multerHost, validExtension } from "../../middlewares/upload.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";

const userRouter = Router();

// Get All Users
userRouter.get("/", auth(), UC.getUsers);

// Get User Profile
userRouter.get("/profile", auth(), UC.getProfile);

// Update User
userRouter.patch("/update", auth(), validation(UV.updateUserValidation), UC.updateUser);

// Delete User
userRouter.delete("/", auth(), UC.deleteUser);

export default userRouter;
