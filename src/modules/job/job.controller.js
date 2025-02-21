import AppError from "../../utils/ErrorClass.js";
import jobModel from "../../../DB/models/job.model.js";
import companyModel from "../../../DB/models/company.model.js";
import applicationModel from "../../../DB/models/application.model.js";

// @desc    Get All Jobs
// @route   GET /api/v1/jobs/
export const getJobs = async (req, res, next) => {
  const jobs = await jobModel.findAll();
  res.status(200).json({ msg: "success", count: jobs.length, jobs });
};

// @desc    Get Single Job
// @route   GET /api/v1/jobs/:id
export const getJob = async (req, res, next) => {
  const checkJob = await jobModel.findByPk(req.params.id);
  if (!checkJob) return next(new AppError(404, `Job not found `));

  const job = await jobModel.findOne({ where: { id: req.params.id } });
  res.status(200).json({ msg: "success", job });
};

// @desc    Get All Jobs For Company
// @route   GET /api/v1/jobs/company/:companyId
export const getCompanyJobs = async (req, res, next) => {
  const { companyId } = req.params;

  const company = await companyModel.findByPk(companyId);
  if (!company) return next(new AppError(404, `Company not found `));

  const jobs = await jobModel.findAll({ where: { CompanyId: companyId } });
  res.status(200).json({ msg: "success", count: jobs.length, jobs });
};

// @desc    Create Job
// @route   POST /api/v1/jobs/create
export const createJob = async (req, res, next) => {
  const {
    jobTitle,
    description,
    location,
    jobTime,
    workPlace,
    jobExperience,
    requirements,
    salary,
    CompanyId,
    CategoryId,
  } = req.body;

  const job = await jobModel.create({
    jobTitle,
    description,
    location,
    jobTime,
    workPlace,
    jobExperience,
    requirements,
    salary,
    CompanyId,
    CategoryId,
  });

  res.status(201).json({ msg: "created success", job });
};

// @desc    Update Job
// @route   POST /api/v1/jobs/:id
export const updateJob = async (req, res, next) => {
  const job = await jobModel.findByPk(req.params.id);
  if (!job) return next(new AppError(404, `Job not found `));

  const {
    jobTitle,
    description,
    location,
    jobTime,
    workPlace,
    jobExperience,
    requirements,
    salary,
    CategoryId,
  } = req.body;

  // update the jobTitle
  job.jobTitle = jobTitle;

  // update the description
  job.description = description;

  // update the location
  job.location = location;

  // update the jobTime
  job.jobTime = jobTime;

  // update the workPlace
  job.workPlace = workPlace;

  // update the jobExperience
  job.jobExperience = jobExperience;

  // update the requirements
  job.requirements = requirements;

  // update the salary
  job.salary = salary;

  // update the CategoryId
  job.CategoryId = CategoryId;

  await job.save();

  res.status(201).json({ msg: "created success", job });
};

// @desc    Delete Job
// @route   delete /api/v1/jobs/:id
export const deleteJob = async (req, res, next) => {
  const job = await jobModel.findByPk(req.params.id);
  if (!job) return next(new AppError(404, `Job not found `));

  // delete applications for this job
  await applicationModel.destroy({ where: { JobId: req.params.id } });

  await jobModel.destroy({ where: { id: req.params.id } });
  res.status(200).json({ msg: "deleted success" });
};
