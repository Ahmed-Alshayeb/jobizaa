import joi from "joi";

// Get All Portfolios For Profile
export const getPortfoliosValidation = {
  params: joi.object({
    profileId: joi.number().required(),
  }),
};

// Create Portfolio Validation
export const createPortfolioValidation = {
  body: joi.object({
    profileId: joi.number().required(),
    url: joi.string().required(),
  }),
};

// Update Portfolio Validation
export const updatePortfolioValidation = {
  body: joi.object({
    url: joi.string().required(),
  }),
  params: joi.object({
    id: joi.number().required(),
  }),
};

// Delete Portfolio Validation
export const deletePortfolioValidation = {
  params: joi.object({
    id: joi.number().required(),
  }),
};
 