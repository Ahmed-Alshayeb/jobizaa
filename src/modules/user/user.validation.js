import joi from "joi";

import { generalFiled, systemRoles } from "../../utils/generalFile.js";

// Sign Up Validation
export const updateUserValidation = {
  body: joi.object({
    fullName: joi.string().min(3).optional(),
    email: generalFiled.email.optional(),
    phone: generalFiled.phone.optional(),
    address: joi.string().optional(),
    jobTitle: joi.string().optional(),
    role: joi
      .string()
      .valid(...Object.values(systemRoles))
      .optional(),
  }),
};
