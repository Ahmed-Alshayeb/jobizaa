import profileModel from "../../../DB/models/profile.model.js";
import user_educationModel from "../../../DB/models/user_education.model.js";
import AppError from "../../utils/ErrorClass.js";

// @desc    Get All User Education
// @route   GET /api/v1/user_educations
export const getUserEducation = async (req, res, next) => {
  const educations = await user_educationModel.findAll({
    where: { ProfileId: req.params.id },
  });
  if (!educations) return next(new AppError(404, "No educations found"));

  res.status(200).json({ msg: "success", user: req.user.email, count: educations.length, educations });
};

// @desc    Add Education To User
// @route   POST /api/v1/user_educations/add
export const addEducation = async (req, res, next) => {
  const { ProfileId, institutionName, degree, studyField, startDate, endDate } = req.body;

  const Profile = await profileModel.findOne({ where: { id: ProfileId } });
  if (!Profile) return next(new AppError(404, "Profile not exist"));

  const check = await user_educationModel.findOne({ where: { institutionName } });
  if (check) return next(new AppError(400, "Education already exist"));

  const education = await user_educationModel.create({
    ProfileId,
    institutionName,
    degree,
    studyField,
    startDate,
    endDate,
  });

  res.status(201).json({ msg: "added successfully", education });
};

// @desc    Remove Education From User
// @route   DELETE /api/v1/user_educations/:id
export const removeEducation = async (req, res, next) => {
  const education = await user_educationModel.findByPk(req.params.id);
  if (!education) return next(new AppError(404, "Education not exist"));

  await user_educationModel.destroy({ where: { id: req.params.id, ProfileId: education.ProfileId } });

  res.status(200).json({ msg: "removed success" });
};
