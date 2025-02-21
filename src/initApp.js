import { config } from "dotenv";
import connectionDB from "../DB/connectionDB.js";
import * as Routes from "./index.routes.js";
import session from "express-session";
import passport from "passport";
import "./services/socialAuth.service.js";

export const initApp = (app, express) => {
  config();
  const port = +process.env.PORT || 8000;

  app.use(express.json());

  // DataBase Connection
  connectionDB();

  // Passport & Session
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // Routes
  app.use("/", (req, res) => {
    res.send("Welcome to Job Portal API");
  });
  app.use("/api/v1/jobs", Routes.jobRouter);
  app.use("/api/v1/users", Routes.userRouter);
  app.use("/api/v1/resumes", Routes.resumeRouter);
  app.use("/api/v1/authenticat", Routes.authRouter);
  app.use("/api/v1/profiles", Routes.profileRouter);
  app.use("/api/v1/companies", Routes.companyRouter);
  app.use("/api/v1/categories", Routes.categoryRouter);
  app.use("/api/v1/portfolios", Routes.portfolioRouter);
  app.use("/api/v1/applications", Routes.applicationRouter);
  app.use("/api/v1/user_educations", Routes.userEducationRouter);
  app.use("/api/v1/user_experiences", Routes.userExperienceRouter);

  // Globel Error Handling
  app.use((err, req, res, next) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  });

  // Route Not Found
  app.all("*", (req, res, next) => {
    res.status(404).json({
      status: "fail",
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  });

  // Start Server
  app.listen(port, () => {
    console.log(`App listening on port ${port}!...`);
  });
};
