import joi from "joi";

// Get Specific Profile Validation
export const getProfileValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};

// Create Profile Validation
export const createProfileValidation = {
  body: joi.object({
    jobTitle: joi.string().min(3).required(),
  }),
};

// Update Profile Validation
export const updateProfileValidation = {
  body: joi.object({
    jobTitle: joi.string().min(3).optional(),
  }),
  params: joi.object({
    id: joi.number().required(),
  }),
};

// Delete Profile Validation
export const deleteProfileValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};
