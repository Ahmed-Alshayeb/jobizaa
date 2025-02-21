import joi from "joi";

import { generalFiled, systemRoles } from "../../utils/generalFile.js";

// Sign Up Validation
export const signUpValidation = {
  body: joi.object({
    fullName: joi.string().min(3).required(),
    email: generalFiled.email.required(),
    password: generalFiled.password.required(),
    cPassword: joi.string().valid(joi.ref("password")).required(),
  }),
};

// Login Validation
export const loginValidation = {
  body: joi.object({
    email: generalFiled.email.required(),
    password: joi.string().required(),
  }),
};

// Forget Password Validation
export const forgetPasswordValidation = {
  body: joi.object({
    email: generalFiled.email.required(),
  }),
};

// Reset Password Validation
export const resetPasswordValidation = {
  body: joi.object({
    email: generalFiled.email.required(),
    OTP: joi.string().length(4).required(),
    password: generalFiled.password.required(),
    cPassword: joi.string().valid(joi.ref("password")).required(),
  }),
};

// Update Password Validation
export const updatePasswordValidation = {
  body: joi.object({
    lastPassword: joi.string().required(),
    newPassword: generalFiled.password.required(),
    cPassword: joi.string().valid(joi.ref("newPassword")).required(),
  }),
};
 