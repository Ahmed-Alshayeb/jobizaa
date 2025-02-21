import joi from "joi";

// Get Specific Validation
export const getCategoryValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};

// Create Category Validation
export const createCategoryValidation = {
  body: joi.object({
    name: joi.string().min(3).required(),
  }),
};

// Update Category Validation
export const updateCategoryValidation = {
  body: joi.object({
    name: joi.string().min(3).required(),
  }),
  params: joi.object({
    id: joi.number().required(),
  }),
};

// Delete Category Validation
export const deleteCategoryValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};
