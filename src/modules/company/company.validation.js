import joi from "joi";

// Get Specific Company Validation
export const getCompanyValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};

// Create Company Validation
export const createCompanyValidation = {
  body: joi.object({
    name: joi.string().min(2).required(),
    description: joi.string().min(2).required(),
    location: joi.string().min(2).required(),
    industry: joi.string().min(2).required(),
    websiteURL: joi.string().min(2).required(),
  }),
};

// Update Company Validation
export const updateCompanyValidation = {
  body: joi.object({
    name: joi.string().min(2).optional(),
    description: joi.string().min(2).optional(),
    location: joi.string().min(2).optional(),
    industry: joi.string().min(2).optional(),
    websiteURL: joi.string().min(2).optional(),
  }),
  params: joi.object({
    id: joi.number().required(),
  }),
};

// Delete Company Validation
export const deleteCompanyValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};
