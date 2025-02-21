import { nanoid } from "nanoid";
import userModel from "../../../DB/models/user.model.js";
import cloudinary from "../../services/cloudinary.service.js";
import AppError from "../../utils/ErrorClass.js";
import profileModel from "../../../DB/models/profile.model.js";

// @desc    Get All Users
// @route   GET /api/v1/users
export const getUsers = async (req, res, next) => {
  const users = await userModel.findAll();
  res.status(200).json({ msg: "success", count: users.length, users });
};

// @desc    Get User Profile
// @route   GET /api/v1/users
export const getProfile = async (req, res, next) => {
  const user = await userModel.findByPk(req.user.id);
  if (!user) return next(new AppError(404, "User not found"));

  res.status(200).json({ msg: "success", user });
};

// @desc    Update User
// @route   PATCH /api/v1/users/update
export const updateUser = async (req, res, next) => {
  try {
    const { fullName, email, phone, address } = req.body;

    // Check if user exists
    const user = await userModel.findByPk(req.user.id);
    if (!user) return next(new AppError(404, "User not found"));

    // Update FullName
    if (fullName) user.fullName = fullName;

    // Update email
    if (email) {
      const emailExist = await userModel.findOne({ where: { email } });
      if (emailExist) return next(new AppError(400, "Email already exists"));
      user.email = email;
    }

    // Update phone
    if (phone) {
      const phoneExist = await userModel.findOne({ where: { phone } });
      if (phoneExist) return next(new AppError(400, "Phone already exists"));
      user.phone = phone;
    }

    // Update address
    if (address) user.address = address;

    await user.save();

    res.status(200).json({ msg: "Success", user });
  } catch (error) {
    next(new AppError(500, "Server error"));
  }
};

// @desc    Delete User
// @route   DELETE /api/v1/users
export const deleteUser = async (req, res, next) => {
  // Delete user from DB
  const user = await userModel.findByPk(req.user.id);
  if (!user) return next(new AppError(404, "User not found"));

  const profiles = await profileModel.findAll({ where: { UserId: user.id } });

  for (const profile of profiles) {
    await cloudinary.api.delete_resources_by_prefix(`Jobizaa/user/profiles/${profile.customId}`);
    await cloudinary.api.delete_folder(`Jobizaa/user/profiles/${profile.customId}`);
  }

  // Delete profile for user
  await profileModel.destroy({ where: { UserId: user.id } });

  await userModel.destroy({ where: { id: user.id } });

  res.status(200).json({ msg: "deleted successfully" });
};
