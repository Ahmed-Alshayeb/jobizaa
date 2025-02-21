import joi from "joi";
import { applicationStatus } from "../../utils/generalFile.js";

// Get Single Application Validation
export const getApplicationValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};

// Get All Applications For Profile Validation
export const getProfileApplicationsValidation = {
  params: joi.object({
    profileId: joi.number().required(),
  }),
};

// Get All Applications For Job Validation
export const getJobApplicationsValidation = {
  params: joi.object({
    jobId: joi.number().required(),
  }),
};

// Create Application Validation
export const createApplicationValidation = {
  body: joi.object({
    coverLetter: joi.string().min(20).required(),
    JobId: joi.number().required(),
    PortfolioId: joi.number().required(),
    ResumeId: joi.number().required(),
    ProfileId: joi.number().required(),
  }),
};

// Delete Application Validation
export const updateApplicationValidation = {
  body: joi.object({
    coverLetter: joi.string().min(20).optional(),
    PortfolioId: joi.number().optional(),
    ResumeId: joi.number().optional(),
    status: joi
      .string()
      .valid(...Object.values(applicationStatus))
      .optional(),
  }),
  params: joi.object({
    id: joi.number().required(),
  }),
};

// Delete Application Validation
export const deleteApplicationValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};
