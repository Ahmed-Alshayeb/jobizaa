import applicationRouter from "./modules/application/application.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import companyRouter from "./modules/company/company.routes.js";
import jobRouter from "./modules/job/job.routes.js";
import portfolioRouter from "./modules/portfolio/portfolio.routes.js";
import profileRouter from "./modules/profile/profile.routes.js";
import resumeRouter from "./modules/resume/resume.routes.js";
import userRouter from "./modules/user/user.routes.js";
import userEducationRouter from "./modules/user_education/user_education.routes.js";
import userExperienceRouter from "./modules/user_experience/user_experience.routes.js";

export {
  userRouter,
  authRouter,
  userEducationRouter,
  userExperienceRouter,
  categoryRouter,
  profileRouter,
  resumeRouter,
  portfolioRouter,
  companyRouter,
  jobRouter,applicationRouter
};
