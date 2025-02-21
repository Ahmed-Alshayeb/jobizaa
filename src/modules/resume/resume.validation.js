import joi from "joi";

// Get All Resumes For Profile
export const getResumesValidation = {
  params: joi.object({
    profileId: joi.number().required(),
  }),
};

// Create Resume Validation
export const createResumeValidation = {
  body: joi.object({
    profileId: joi.number().required(),
  }),
};

// Delete Resume Validation
export const deleteResumeValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};
