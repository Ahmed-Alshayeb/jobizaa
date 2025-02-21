import slugify from "slugify";
import categoryModel from "../../../DB/models/category.model.js";
import AppError from "../../utils/ErrorClass.js";
import { nanoid } from "nanoid";
import cloudinary from "../../services/cloudinary.service.js";
import companyModel from "../../../DB/models/company.model.js";

// @desc    Get All Companies
// @route   GET /api/v1/companies
export const getCompanies = async (req, res, next) => {
  const Companies = await companyModel.findAll();
  res.status(200).json({ msg: "success", count: Companies.length, Companies });
};

// @desc    Get Specific Company
// @route   GET /api/v1/companies/:id
export const getCompany = async (req, res, next) => {
  const company = await companyModel.findByPk(req.params.id);
  if (!company) return next(new AppError(404, "Company not exist"));

  res.status(200).json({ msg: "success", company });
};

// @desc    Create create Company
// @route   POST /api/v1/companies/create
export const createCompany = async (req, res, next) => {
  const { name, description, location, industry, websiteURL } = req.body;
  const customId = nanoid(8);

  // Check if Company already exist
  const nameExist = await companyModel.findOne({ where: { name } });
  if (nameExist) return next(new AppError(400, "Company already exist"));

  // upload image
  let secure_url, public_id;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `Jobizaa/companies/${customId}`,
    });
    secure_url = result.secure_url;
    public_id = result.public_id;
  } else {
    res.status(400).json({ msg: "Please upload an image" });
  }

  const company = await companyModel.create({
    name,
    description,
    location,
    industry,
    websiteURL,
    secure_url,
    public_id,
    customId,
  });

  res.status(201).json({ msg: "created success", company });
};

// @desc    Update Company
// @route   PATCH /api/v1/companies/:id
export const updateCompany = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, location, industry, websiteURL } = req.body;
  const customId = nanoid(8);

  // Check if category not exist
  const company = await companyModel.findByPk(id);
  if (!company) return next(new AppError(404, "Company not exist"));

  // update company name
  if (name) {
    const nameExist = await companyModel.findOne({ where: { name } });
    if (nameExist) return next(new AppError(400, "company name already exist"));

    company.name = name;
  }

  // update company description
  if (description) company.description = description;

  // update company location
  if (location) company.location = location;

  // update company industry
  if (industry) company.industry = industry;

  // update company websiteURL
  if (websiteURL) company.websiteURL = websiteURL;

  // upload image
  if (req.file) {
    await cloudinary.api.delete_resources_by_prefix(`Jobizaa/companies/${company.customId}`);
    await cloudinary.api.delete_folder(`Jobizaa/companies/${company.customId}`);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `Jobizaa/companies/${customId}`,
    });
    company.secure_url = result.secure_url;
    company.public_id = result.public_id;
    company.customId = customId;
  }

  await company.save();

  res.status(200).json({ msg: "updated success", company });
};

// @desc    Delete Company
// @route   delete /api/v1/companies/:id
export const deleteCompany = async (req, res, next) => {
  const company = await companyModel.findByPk(req.params.id);
  if (!company) return next(new AppError(404, "company not exist"));

  await cloudinary.api.delete_resources_by_prefix(`Jobizaa/companies/${company.customId}`);
  await cloudinary.api.delete_folder(`Jobizaa/companies/${company.customId}`);

  await companyModel.destroy({ where: { id: company.id } });

  res.status(200).json({ msg: "deleted success" });
};
