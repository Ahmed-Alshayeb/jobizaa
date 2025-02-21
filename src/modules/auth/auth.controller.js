import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../../utils/asyncHandler.js";
import cloudinary from "../../services/cloudinary.service.js";
import userModel from "../../../DB/models/user.model.js";
import sendEmail from "../../services/nodeMailer.service.js";
import AppError from "../../utils/ErrorClass.js";
import { defaultImageURL } from "../../utils/generalFile.js";
import { customAlphabet, nanoid } from "nanoid";
import profileModel from "../../../DB/models/profile.model.js";

// ==================== Google Auth ====================

// @desc    login success
// @route   GET /api/v1/authenticat/auth/success
export const loginSuccess = async (req, res, next) => {
  const customId = nanoid(8);
  // check if user exist
  const user = await userModel.findOne({ where: { email: req.user.email } });
  if (user) {
    if (user.providerId !== req.user.id) {
      return next(new AppError(400, "email already exist with another provider"));
    }
    // generate token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
    return res.status(200).json({ msg: "success", token });
  }

  //  upload image
  const secure_url = req.user.photos[0].value;
  const public_id = req.user.photos[0].type;
  await cloudinary.uploader.upload(secure_url, {
    folder: `Jobizaa/user/profiles/${customId}/image`,
  });

  // create new user
  const newUser = await userModel.create({
    fullName: req.user.displayName,
    email: req.user.email,
    password: bcrypt.hashSync(nanoid(8)),
    confirmed: req.user.verified,
    provider: req.user.provider,
    providerId: req.user.id,
  });

  // create profile
  const profile = await profileModel.create({ UserId: newUser.id, secure_url, public_id, customId });

  // generate token
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET);
  res.status(201).json({ msg: "success", token, user: newUser, profile });
};

// @desc    login failure
// @route   GET /api/v1/auth/failure
export const loginFailure = asyncHandler((req, res, next) => {
  res.send("Failed to authenticate.");
});

// @desc    logout
// @route   GET /api/v1/auth/logout
export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.send("logged out successfully!");
    });
  });
};

// ==================== Facebook Auth ====================

// @desc    Facebook login success
// @route   GET /api/v1/authenticat/auth/success
export const FBloginSuccess = async (req, res, next) => {
  const customId = nanoid(8);
  // check if user exist
  const user = await userModel.findOne({ where: { email: req.user._json.email } });
  if (user) {
    if (user.providerId !== req.user.id) {
      return next(new AppError(400, "user already exist with another provider"));
    }
    // generate token
    const token = jwt.sign({ id: user.id, email: user.email.toLowerCase() }, process.env.JWT_SECRET);
    return res.status(200).json({ msg: "success", token });
  }

  //  upload image
  const secure_url = req.user.photos[0].value;
  const public_id = "facebookImage";
  await cloudinary.uploader.upload(secure_url, {
    folder: `Jobizaa/user/profiles/${customId}/image`,
  });

  // create new user
  const newUser = await userModel.create({
    providerId: req.user.id,
    fullName: req.user.displayName,
    email: req.user._json.email,
    password: bcrypt.hashSync(nanoid(8)),
    confirmed: true,
    provider: req.user.provider,
  });

  // create profile
  const profile = await profileModel.create({ UserId: newUser.id, secure_url, public_id, customId });

  // generate token
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET);
  res.status(201).json({ msg: "success", token, user: newUser, profile });
};

// ==================== System Auth ====================

// @desc    SignUp
// @route   POST /api/v1/authenticat/signUp
export const signUp = asyncHandler(async (req, res, next) => {
  const { fullName, email, password, cPassword, role } = req.body;
  const customId = nanoid(8);

  // check user exist
  const emailExist = await userModel.findOne({ where: { email } });
  if (emailExist) return next(new AppError(400, "Email already exist"));

  // generate token
  const token = await jwt.sign({ email }, process.env.JWT_SECRET);
  const link = `${req.protocol}://${req.get("host")}/api/v1/authenticat/verify/${token}`;

  // hash password
  const hash = await bcrypt.hash(password, +process.env.SALT);

  //  create new user
  const user = await userModel.create({
    fullName,
    email: email.toLowerCase(),
    password: hash,
  });

  await sendEmail(
    email,
    "Verify your email",
    `<h3><b><a href="${link}">click to verify your email</a></b></h3>`
  );

  // upload image
  let secure_url, public_id;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `Jobizaa/user/profiles/${customId}/image`,
    });
    secure_url = result.secure_url;
    public_id = result.public_id;
  } else {
    const result = await cloudinary.uploader.upload(defaultImageURL, {
      folder: `Jobizaa/user/profiles/${customId}/image`,
    });
    secure_url = defaultImageURL;
    public_id = "defaultImage";
  }

  // create profile
  const profile = await profileModel.create({ UserId: user.id, secure_url, public_id, customId });

  res.status(201).json({ msg: "success", user, profile });
});

// @desc    login
// @route   POST /api/v1/authenticat/login
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // check if user exist
  const user = await userModel.findOne({ where: { email, confirmed: 1 } });
  if (!user) return next(new AppError(404, "user not found or not verified"));

  // check provider
  if (user.provider === "google") return next(new AppError(400, "login with google"));

  // check password
  const matchedPass = bcrypt.compareSync(password, user.password);
  if (!matchedPass) return next(new AppError(400, "invalid password"));

  // create token
  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET);

  res.status(200).json({ msg: "login successfully", token });
});

// @desc    Verify Email
// @route   GET /api/v1/authenticat/verify/:token
export const verifyEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.update({ confirmed: "true" }, { where: { email: decoded.email } });
  if (!user) return next(new AppError("invalid token", 400));

  res.status(200).json({ msg: "verification successful" });
});

// @desc    Forgot Password
// @route   POST /api/v1/authenticat/forgetPassword
export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // generate otp
  const otp = customAlphabet("1234567890", 4)();

  // check if user exist
  const user = await userModel.findOne({ where: { email, confirmed: 1 } });
  if (!user) return next(new AppError(404, "user not found"));

  // send otp to email
  await sendEmail(email, "Reset your password", `<h3> <h1>your otp is ${otp}</h1> </h3>`);

  // sort otp
  await userModel.update({ OTP: otp }, { where: { email } });

  res.status(200).json({ msg: "Check your email" });
});

// @desc    Reset Password
// @route   PATCH /api/v1/authenticat/resetPassword
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, OTP, password, cPassword } = req.body;

  // check if user exist
  const user = await userModel.findOne({ where: { email, confirmed: 1 } });
  if (!user) return next(new AppError(404, "user not found"));

  // check otp
  if (user.OTP !== OTP) return next(new AppError(400, "invalid otp"));

  // hash password
  const hash = await bcrypt.hash(password, +process.env.SALT);

  // update password
  await userModel.update({ password: hash, OTP: null, passChangeAt: new Date() }, { where: { email } });

  res.status(200).json({ msg: "update password successfully" });
});

// @desc    Update Password
// @route   PATCH /api/v1/authenticat/updatePassword
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { lastPassword, newPassword, cPassword } = req.body;

  // check if user exist
  const user = await userModel.findOne({ where: { email: req.user.email } });
  if (!user) return next(new AppError(404, "user not found"));

  // check password
  const matchedPass = bcrypt.compareSync(lastPassword, user.password);
  if (!matchedPass) return next(new AppError(400, "last password not match"));

  // check password match last password
  if (newPassword === lastPassword) return next(new AppError(400, "new password match last password"));

  // hash password
  const hash = await bcrypt.hash(newPassword, +process.env.SALT);

  // update password
  await userModel.update({ password: hash }, { where: { email: req.user.email } });

  res.status(200).json({ msg: "password updated successfully" });
});
