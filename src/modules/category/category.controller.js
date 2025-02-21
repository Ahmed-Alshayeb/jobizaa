import slugify from "slugify";
import categoryModel from "../../../DB/models/category.model.js";
import AppError from "../../utils/ErrorClass.js";
import { nanoid } from "nanoid";
import cloudinary from "../../services/cloudinary.service.js";

// @desc    Get All Categories
// @route   GET /api/v1/categories
export const getCategories = async (req, res, next) => {
  const categories = await categoryModel.findAll();
  res.status(200).json({ msg: "success", count: categories.length, categories });
};

// @desc    Get All Category
// @route   GET /api/v1/categories/:id
export const getCategory = async (req, res, next) => {
  const category = await categoryModel.findByPk(req.params.id);
  res.status(200).json({ msg: "success", count: category.length, category });
};

// @desc    Create Category
// @route   POST /api/v1/categories/create
export const createCategory = async (req, res, next) => {
  const { name } = req.body;
  const customId = nanoid(8);

  // Check if category already exist
  const nameExist = await categoryModel.findOne({ where: { name } });
  if (nameExist) return next(new AppError(400, "Category already exist"));

  // upload image
  let secure_url, public_id;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `Jobizaa/category/${customId}`,
    });
    secure_url = result.secure_url;
    public_id = result.public_id;
  } else {
    res.status(400).json({ msg: "Please upload an image" });
  }

  const category = await categoryModel.create({ name, slug: slugify(name), secure_url, public_id, customId });

  res.status(201).json({ msg: "created success", category });
};

// @desc    Update Category
// @route   PATCH /api/v1/categories/:id
export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const customId = nanoid(8);

  // Check if category not exist
  const category = await categoryModel.findByPk(id);
  if (!category) return next(new AppError(404, "Category not exist"));

  // update category name
  if (name) {
    const nameExist = await categoryModel.findOne({ where: { name } });
    if (nameExist) return next(new AppError(400, "Category already exist"));

    category.name = name;
    category.slug = slugify(name);
  }

  // upload image
  if (req.file) {
    await cloudinary.api.delete_resources_by_prefix(`Jobizaa/category/${category.customId}`);
    await cloudinary.api.delete_folder(`Jobizaa/category/${category.customId}`);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `Jobizaa/category/${customId}`,
    });
    category.secure_url = result.secure_url;
    category.public_id = result.public_id;
    category.customId = customId;
  }

  await category.save();

  res.status(200).json({ msg: "updated success", category });
};

// @desc    Delete Category
// @route   delete /api/v1/categories/:id
export const deleteCategory = async (req, res, next) => {
  const category = await categoryModel.findByPk(req.params.id);
  if (!category) return next(new AppError(404, "Category not exist"));

  await cloudinary.api.delete_resources_by_prefix(`Jobizaa/category/${category.customId}`);
  await cloudinary.api.delete_folder(`Jobizaa/category/${category.customId}`);

  await categoryModel.destroy({ where: { id: category.id } });

  res.status(200).json({ msg: "deleted success" });
};
