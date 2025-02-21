import AppError from "../../utils/ErrorClass.js";
import profileModel from "../../../DB/models/profile.model.js";
import portfolioModel from "../../../DB/models/portfolio.model.js";
import applicationModel from "../../../DB/models/application.model.js";
import jobModel from "../../../DB/models/job.model.js";
import resumeModel from "../../../DB/models/resume.model.js";

// @desc    Get All Applications
// @route   GET /api/v1/applications
export const getApplications = async (req, res, next) => {
  const applications = await applicationModel.findAll();
  res.status(200).json({ msg: "success", count: applications.length, applications });
};

// @desc    Get Single Application
// @route   GET /api/v1/application/:id
export const getApplication = async (req, res, next) => {
  const application = await applicationModel.findOne({ where: { id: req.params.id } });
  if (!application) return next(new AppError(404, "Application not found"));
  res.status(200).json({ msg: "success", application });
};

// @desc    Get All Applications For Profile
// @route   GET /api/v1/application/profile/:profileId
export const getProfileApplications = async (req, res, next) => {
  const applications = await applicationModel.findAll({ where: { ProfileId: req.params.profileId } });
  if (!applications) return next(new AppError(404, "No applications found for this profile"));
  res.status(200).json({ msg: "success", count: applications.length, applications });
};

// @desc    Get All Applications For Job
// @route   GET /api/v1/application/job/:jobId
export const getJobApplications = async (req, res, next) => {
  const applications = await applicationModel.findAll({ where: { JobId: req.params.jobId } });
  if (!applications) return next(new AppError(404, "No applications found for this job"));
  res.status(200).json({ msg: "success", count: applications.length, applications });
};

// @desc    Create Application
// @route   POST /api/v1/applications/create
export const createApplication = async (req, res, next) => {
  const { coverLetter, JobId, PortfolioId, ResumeId, ProfileId } = req.body;

  // Check if profile exists
  const profile = await profileModel.findOne({ where: { id: ProfileId } });
  if (!profile) return next(new AppError(404, "Profile not found"));

  // Check if application already sent
  const application = await applicationModel.findOne({ where: { ProfileId, JobId } });
  if (application) return next(new AppError(400, "Application already sent"));

  // Check if job exists
  const job = await jobModel.findOne({ where: { id: JobId } });
  if (!job) return next(new AppError(404, "Job not found"));

  // Check if portfolio exists
  const portfolio = await portfolioModel.findOne({ where: { id: PortfolioId } });
  if (!portfolio) return next(new AppError(404, "Portfolio not found"));

  // Check if resume exists
  const resume = await resumeModel.findOne({ where: { id: ResumeId } });
  if (!resume) return next(new AppError(404, "Resume not found"));

  const newApplication = await applicationModel.create({
    coverLetter,
    JobId,
    PortfolioId,
    ResumeId,
    ProfileId,
  });

  res.status(201).json({ msg: "created success", newApplication });
};

// @desc    Update Application
// @route   PATCH /api/v1/applications/:id
export const updateApplication = async (req, res, next) => {
  const { coverLetter, PortfolioId, ResumeId, status } = req.body;

  // Check if application already sent
  const application = await applicationModel.findOne({ where: { id: req.params.id } });
  if (!application) return next(new AppError(400, "Application not found"));

  // update portfolio
  if (PortfolioId) {
    const portfolio = await portfolioModel.findOne({ where: { id: PortfolioId } });
    if (!portfolio) return next(new AppError(404, "Portfolio not found"));
    application.PortfolioId = PortfolioId;
  }

  // update resume
  if (ResumeId) {
    const resume = await resumeModel.findOne({ where: { id: ResumeId } });
    if (!resume) return next(new AppError(404, "Resume not found"));
    application.ResumeId = ResumeId;
  }

  // update cover letter
  if (coverLetter) application.coverLetter = coverLetter;

  // update status
  application.status = status;

  await application.save();

  res.status(200).json({ msg: "updated success", application });
};

// @desc    Delete Application
// @route   delete /api/v1/applications/:id
export const deleteApplication = async (req, res, next) => {
  await applicationModel.destroy({ where: { id: req.params.id } });
  res.status(200).json({ msg: "deleted success" });
};
