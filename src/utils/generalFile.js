import joi from "joi";

// profile enums
export const systemRoles = {
  user: "user",
  company: "company",
  admin: "admin",
  superAdmin: "super admin",
};

export const systemProviders = {
  system: "system",
  google: "google",
  facebook: "facebook",
};

// job model enums
export const jobTime = {
  fullTime: "full-time",
  partTime: "part-time",
  contract: "contract",
};

export const workPlace = {
  onSite: "on-site",
  remote: "remote",
  hybrid: "hybrid",
};

export const jobExperience = {
  entryLevel: "entryLevel",
  junior: "junior",
  midLevel: "mid-level",
  senior: "senior",
  internship: "internship",
};

export const jobStatus = {
  open: "open",
  closed: "closed",
  applied: "applied",
};

// application model enums
export const applicationStatus = {
  applied: "applied",
  reviewing: "reviewing",
  delivered: "delivered",
};

export const defaultImageURL =
  "https://res.cloudinary.com/dpq8atnxn/image/upload/v1738407183/default-profile-account-unknown-icon-black-silhouette-free-vector_oa11dd.jpg";

export const generalFiled = {
  email: joi.string().email({ tlds: { allow: ["outlook", "com"] }, minDomainSegments: 2 }),
  password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
  phone: joi.string().regex(/^01[0125][0-9]{8}$/),
  rePassword: joi.string().valid(joi.ref("password")),
  file: joi.object({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    fieldname: joi.string().required(),
  }),
  headers: joi.object({
    cookie: joi.string(),
    "cache-control": joi.string(),
    "postman-token": joi.string(),
    "content-type": joi.string(),
    "content-length": joi.string(),
    host: joi.string(),
    "user-agent": joi.string(),
    accept: joi.string(),
    "accept-encoding": joi.string(),
    connection: joi.string(),
    token: joi.string().required(),
  }),
};
