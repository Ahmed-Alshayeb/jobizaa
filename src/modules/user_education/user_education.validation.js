import joi from "joi";

// Get Education To User Validation
export const getUserEducationValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};

// Add Education To User Validation
export const addEducationValidation = {
  body: joi.object({
    ProfileId: joi.number().required(),
    institutionName: joi.string().min(3).required(),
    degree: joi.string().min(1).optional(),
    studyField: joi.string().min(3).optional(),
    startDate: joi.date().required(),
    endDate: joi.date().min(joi.ref("startDate")).required(),
  }),
};

// Remove Education From User Validation
export const removeEducationValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};
