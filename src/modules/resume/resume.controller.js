import AppError from "../../utils/ErrorClass.js";
import { nanoid } from "nanoid";
import cloudinary from "../../services/cloudinary.service.js";
import profileModel from "../../../DB/models/profile.model.js";
import resumeModel from "../../../DB/models/resume.model.js";

// @desc    Get All Resumes For Profile
// @route   GET /api/v1/resumes/:profileId
export const getResumes = async (req, res, next) => {
  const profile = await profileModel.findByPk(req.params.profileId);
  if (!profile) return next(new AppError(404, "profile not found"));

  const resumes = await resumeModel.findAll({ where: { ProfileId: profile.id } });

  res.status(200).json({ msg: "success", count: resumes.length, resumes });
};

// @desc    Create Resume
// @route   POST /api/v1/resumes/create
export const createResume = async (req, res, next) => {
  const { profileId } = req.body;
  const customId = nanoid(8);

  // Check if profile exist
  const profile = await profileModel.findByPk(profileId);
  if (!profile) return next(new AppError(404, "profile not found"));

  // upload resume
  let secure_url, public_id;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `Jobizaa/user/profiles/${profile.customId}/resumes/${customId}`,
    });
    secure_url = result.secure_url;
    public_id = result.public_id;
  } else {
    res.status(400).json({ msg: "Please upload an resume" });
  }

  const resume = await resumeModel.create({ ProfileId: profileId, secure_url, public_id, customId });

  res.status(201).json({ msg: "created success", resume });
};

// @desc    Delete Resume
// @route   delete /api/v1/resumes/:id
export const deleteResume = async (req, res, next) => {
  const resume = await resumeModel.findByPk(req.params.id);
  if (!resume) return next(new AppError(404, "Resume not exist"));

  const profile = await profileModel.findByPk(resume.ProfileId);
  if (!profile) return next(new AppError(404, "Profile not exist"));

  await cloudinary.api.delete_resources_by_prefix(
    `Jobizaa/user/profiles/${profile.customId}/resumes/${resume.customId}`
  );
  await cloudinary.api.delete_folder(`Jobizaa/user/profiles/${profile.customId}/resumes/${resume.customId}`);

  await resumeModel.destroy({ where: { id: resume.id } });

  res.status(200).json({ msg: "deleted success" });
};
