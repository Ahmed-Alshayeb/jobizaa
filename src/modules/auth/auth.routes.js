import { Router } from "express";
import passport from "passport";
import * as AC from "./auth.controller.js";
import { isLoggedIn } from "../../middlewares/googleAuth.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as AV from "./auth.validation.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { systemRoles } from "../../utils/generalFile.js";

const authRouter = Router();

// ==================== Google Auth ====================

authRouter.get("/", (req, res) => {
  res.send(
    "<a href='authenticat/auth/google'>Login with Google</a> <br> <br> <a href='authenticat/auth/facebook'>Login with Facebook</a>"
  );
});

authRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/v1/authenticat/start",
    failureRedirect: "/api/v1/authenticat/auth/failure",
  })
);

authRouter.get("/auth/failure", AC.loginFailure);

authRouter.use("/start", isLoggedIn, AC.loginSuccess);

authRouter.get("/logout", AC.logout);

// ==================== Facebook Auth ====================

authRouter.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

authRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  AC.FBloginSuccess
);

// ==================== System Auth ====================

// @desc    Register New User
authRouter.post("/signUp", validation(AV.signUpValidation), AC.signUp);

// @desc    Verify Email
authRouter.get("/verify/:token", AC.verifyEmail);

// @desc    Login
authRouter.post("/login", validation(AV.loginValidation), AC.login);

// @desc    Forgot Password
authRouter.post("/forgetPassword", validation(AV.forgetPasswordValidation), AC.forgetPassword);

// @desc    Reset Password
authRouter.patch("/resetPassword", validation(AV.resetPasswordValidation), AC.resetPassword);

// @desc    Update Password
authRouter.patch(
  "/updatePassword",
  auth(Object.values(systemRoles)),
  validation(AV.updatePasswordValidation),
  AC.updatePassword
);
 
export default authRouter;
