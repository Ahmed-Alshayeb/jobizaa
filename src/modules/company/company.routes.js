import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as CC from "./company.controller.js";
import * as CV from "./company.validation.js";
import { multerHost, validExtension } from "../../middlewares/upload.middleware.js";

const companyRouter = Router();

// Get All Companies
companyRouter.get("/", auth(), CC.getCompanies);

// Get Specific Company
companyRouter.get("/:id", auth(), validation(CV.getCompanyValidation), CC.getCompany);

// Create Company
companyRouter.post(
  "/create",
  auth(),
  multerHost(validExtension.image).single("image"),
  validation(CV.createCompanyValidation),
  CC.createCompany
);

// Update Company
companyRouter.patch(
  "/:id",
  auth(),
  multerHost(validExtension.image).single("image"),
  validation(CV.updateCompanyValidation),
  CC.updateCompany
);

// Delete Company
companyRouter.delete("/:id", auth(), validation(CV.deleteCompanyValidation), CC.deleteCompany);

export default companyRouter;
