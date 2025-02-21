import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as PC from "./portfolio.controller.js";
import * as PV from "./portfolio.validation.js";
import { multerHost, validExtension } from "../../middlewares/upload.middleware.js";

const portfolioRouter = Router();

// Get All Portfolios For Profile
portfolioRouter.get("/:profileId", auth(), validation(PV.getPortfoliosValidation), PC.getPortfolios);

// Create Portfolio
portfolioRouter.post(
  "/create",
  auth(),
  multerHost(validExtension.image).array({ maxCount: 10 }),
  validation(PV.createPortfolioValidation),
  PC.createPortfolio
);

// // Update Portfolio
// portfolioRouter.patch(
//   "/create",
//   auth(),
//   multerHost(validExtension.image).array({ maxCount: 10 }),
//   validation(PV.updatePortfolioValidation),
//   PC.updatePortfolio
// );

// Delete Portfolio
portfolioRouter.delete("/:id", auth(), validation(PV.deletePortfolioValidation), PC.deletePortfolio);

export default portfolioRouter;
