import joi from "joi";
import { jobExperience, jobTime, workPlace } from "../../utils/generalFile.js";

// Get Single Job Validation
export const getJobValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};

// Create Job Validation
export const createJobValidation = {
  body: joi.object({
    jobTitle: joi.string().min(3).required(),
    description: joi.string().min(5).required(),
    location: joi.string().min(3).required(),
    jobTime: joi
      .string()
      .valid(...Object.values(jobTime))
      .required(),
    workPlace: joi
      .string()
      .valid(...Object.values(workPlace))
      .required(),
    jobExperience: joi
      .string()
      .valid(...Object.values(jobExperience))
      .required(),
    requirements: joi.string().min(3).required(),
    salary: joi.number().required(),
    CompanyId: joi.number().required(),
    CategoryId: joi.number().required(),
  }),
};

// Create Job Validation
export const updateJobValidation = {
  body: joi.object({
    jobTitle: joi.string().min(3).optional(),
    description: joi.string().min(5).optional(),
    location: joi.string().min(3).optional(),
    jobTime: joi
      .string()
      .valid(...Object.values(jobTime))
      .optional(),
    workPlace: joi
      .string()
      .valid(...Object.values(workPlace))
      .optional(),
    jobExperience: joi
      .string()
      .valid(...Object.values(jobExperience))
      .optional(),
    requirements: joi.string().min(3).optional(),
    salary: joi.number().optional(),
    CategoryId: joi.number().optional(),
  }),
};

// Delete Job Validation
export const deleteJobValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};
