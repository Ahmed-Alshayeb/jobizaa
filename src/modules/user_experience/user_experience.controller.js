import profileModel from "../../../DB/models/profile.model.js";
import user_experienceModel from "../../../DB/models/user_experience.model.js";
import AppError from "../../utils/ErrorClass.js";

// @desc    Get All User Experience
// @route   GET /api/v1/user_experiences
export const getUserExperience = async (req, res, next) => {
  const experiences = await user_experienceModel.findAll({
    where: { ProfileId: req.params.id },
  });
  if (!experiences) return next(new AppError(404, "No experience found"));

  res.status(200).json({ msg: "success", user: req.user.email, count: experiences.length, experiences });
};

// @desc    Add Experience To User
// @route   POST /api/v1/user_experiences/add
export const addExperience = async (req, res, next) => {
  const { ProfileId, companyName, jobTitle, location, startDate, endDate } = req.body;

  const Profile = await profileModel.findOne({ where: { id: ProfileId } });
  if (!Profile) return next(new AppError(404, "Profile not exist"));

  const check = await user_experienceModel.findOne({ where: { companyName } });
  if (check) return next(new AppError(400, "Experience already exist"));

  const experience = await user_experienceModel.create({
    ProfileId,
    companyName,
    jobTitle,
    location,
    startDate,
    endDate,
  });

  res.status(201).json({ msg: "added successfully", experience });
};

// @desc    Remove Experience From User
// @route   DELETE /api/v1/user_experiences/:id
export const removeExperience = async (req, res, next) => {
  const experience = await user_experienceModel.findByPk(req.params.id);
  if (!experience) return next(new AppError(404, "Experience not exist"));

  await user_experienceModel.destroy({ where: { id: req.params.id, ProfileId: experience.ProfileId } });

  res.status(200).json({ msg: "removed success" });
};
