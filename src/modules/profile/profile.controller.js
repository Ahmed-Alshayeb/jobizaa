import AppError from "../../utils/ErrorClass.js";
import { nanoid } from "nanoid";
import cloudinary from "../../services/cloudinary.service.js";
import profileModel from "../../../DB/models/profile.model.js";
import { defaultImageURL } from "../../utils/generalFile.js";
import user_educationModel from "../../../DB/models/user_education.model.js";
import user_experienceModel from "../../../DB/models/user_experience.model.js";
import resumeModel from "../../../DB/models/resume.model.js";
import portfolioModel from "../../../DB/models/portfolio.model.js";
import applicationModel from "../../../DB/models/application.model.js";

// @desc    Get All Profiles For User
// @route   GET /api/v1/profiles
export const getProfiles = async (req, res, next) => {
  const profiles = await profileModel.findAll({ where: { userId: req.user.id } });
  res.status(200).json({ msg: "success", count: profiles.length, profiles });
};

// @desc    Get Specific Profile
// @route   GET /api/v1/profiles/:id
export const getProfile = async (req, res, next) => {
  const Profile = await profileModel.findOne({
    where: { id: req.params.id },
    include: [
      { model: user_educationModel },
      { model: user_experienceModel },
      { model: resumeModel },
      { model: portfolioModel },
      { model: applicationModel },
    ],
  });
  if (!Profile) return next(new AppError(404, "Profile not found"));

  res.status(200).json({ msg: "success", Profile });
};

// @desc    Create Profile
// @route   POST /api/v1/profiles/create
export const createProfile = async (req, res, next) => {
  const { jobTitle } = req.body;
  const customId = nanoid(8);

  // Check if profile already exist
  const profile = await profileModel.findOne({ where: { jobTitle, UserId: req.user.id } });
  if (profile) return next(new AppError(400, "profile already exist"));

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

  const newProfile = await profileModel.create({
    jobTitle,
    UserId: req.user.id,
    secure_url,
    public_id,
    customId,
  });

  res.status(201).json({ msg: "created success", newProfile });
};

// @desc    Update Profile
// @route   PATCH /api/v1/profiles/:id
export const updateProfile = async (req, res, next) => {
  const { id } = req.params;
  const { jobTitle } = req.body;
  const customId = nanoid(8);

  const ProfileExist = await profileModel.findByPk(id);
  if (!ProfileExist) return next(new AppError(404, "Profile not exist"));

  if (jobTitle) {
    const profileExistName = await profileModel.findOne({ where: { jobTitle, UserId: req.user.id } });
    if (profileExistName) return next(new AppError(400, "jobTitle already exist"));
    ProfileExist.jobTitle = jobTitle;
  }

  // upload image
  if (req.file) {
    await cloudinary.api.delete_resources_by_prefix(`Jobizaa/user/profiles/${ProfileExist.customId}/image`);
    await cloudinary.api.delete_folder(`Jobizaa/user/profiles/${ProfileExist.customId}/image`);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `Jobizaa/user/profiles/${customId}/image`,
    });
    ProfileExist.secure_url = result.secure_url;
    ProfileExist.public_id = result.public_id;
    ProfileExist.customId = customId;
  }

  await ProfileExist.save();

  res.status(200).json({ msg: "updated success", ProfileExist });
};

// @desc    Delete Profile
// @route   delete /api/v1/profiles/:id
export const deleteProfile = async (req, res, next) => {
  const profile = await profileModel.findByPk(req.params.id);
  if (!profile) return next(new AppError(404, "Profile not exist"));

  // Delete profile image
  await cloudinary.api.delete_resources_by_prefix(`Jobizaa/user/profiles/${profile.customId}`);
  await cloudinary.api.delete_folder(`Jobizaa/user/profiles/${profile.customId}`);

  // Delete user_education
  await user_educationModel.destroy({ where: { ProfileId: profile.id } });

  // Delete user_experience
  await user_experienceModel.destroy({ where: { ProfileId: profile.id } });

  // Delete resumes
  await resumeModel.destroy({ where: { ProfileId: profile.id } });

  // Delete portfolios
  await portfolioModel.destroy({ where: { ProfileId: profile.id } });

  // Delete applications
  await applicationModel.destroy({ where: { ProfileId: profile.id } });

  await profileModel.destroy({ where: { id: profile.id, UserId: req.user.id } });

  res.status(200).json({ msg: "deleted success" });
};
