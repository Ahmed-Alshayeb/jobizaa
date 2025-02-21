import joi from "joi";

// Get Experience To User Validation
export const getExperienceValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};

// Add Experience To User Validation
export const addExperienceValidation = {
  body: joi.object({
    ProfileId: joi.number().required(),
    companyName: joi.string().min(3).required(),
    jobTitle: joi.string().min(1).required(),
    location: joi.string().min(3).required(),
    startDate: joi.date().required(),
    endDate: joi.date().min(joi.ref("startDate")).required(),
  }),
};

// Remove Experience From User Validation
export const removeExperienceValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};

 