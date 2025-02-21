import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as CC from "./category.controller.js";
import * as CV from "./category.validation.js";
import { multerHost, validExtension } from "../../middlewares/upload.middleware.js";

const categoryRouter = Router();

// Get All Categories
categoryRouter.get("/", auth(), CC.getCategories);

// Get Specific Category
categoryRouter.get("/:id", auth(), validation(CV.getCategoryValidation), CC.getCategory);

// Create Category
categoryRouter.post(
  "/create",
  auth(),
  multerHost(validExtension.image).single("image"),
  validation(CV.createCategoryValidation),
  CC.createCategory
);

// Update Category
categoryRouter.patch(
  "/:id",
  auth(),
  multerHost(validExtension.image).single("image"),
  validation(CV.updateCategoryValidation),
  CC.updateCategory
);

// Delete Category
categoryRouter.delete("/:id", auth(), validation(CV.deleteCategoryValidation), CC.deleteCategory);

export default categoryRouter;
