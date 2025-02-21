import AppError from "../../utils/ErrorClass.js";
import { nanoid } from "nanoid";
import cloudinary from "../../services/cloudinary.service.js";
import profileModel from "../../../DB/models/profile.model.js";
import portfolioModel from "../../../DB/models/portfolio.model.js";

// @desc    Get All Portfolio For Profile
// @route   GET /api/v1/resumes/:profileId
export const getPortfolios = async (req, res, next) => {
  const profile = await profileModel.findByPk(req.params.profileId);
  if (!profile) return next(new AppError(404, "profile not found"));

  const portfolios = await portfolioModel.findAll({ where: { ProfileId: profile.id } });

  res.status(200).json({ msg: "success", count: portfolios.length, portfolios });
};

// @desc    Create Portfolio
// @route   POST /api/v1/resumes/create
export const createPortfolio = async (req, res, next) => {
  const { url, profileId } = req.body;
  // const customId = nanoid(10);

  // Check if profile exist
  const profile = await profileModel.findByPk(profileId);
  if (!profile) return next(new AppError(404, "profile not found"));

  // // Upload image to cloudinary
  // if (req.file) {
  //   const result = await cloudinary.uploader.upload(req.file.path, {
  //     folder: `Jobizaa/Portfolios/${customId}`,
  //   });
  //   secure_url = result.secure_url;
  //   public_id = result.public_id;
  // }

  const portfolio = await portfolioModel.create({
    ProfileId: profileId,
    url,
    // secure_url,
    // public_id,
    // customId,
  });

  res.status(201).json({ msg: "created success", portfolio });
};

// // @desc    Update Portfolio
// // @route   PUT /api/v1/portfolios/:id
// export const updatePortfolio = async (req, res, next) => {
//   const { url } = req.body;
//   const customId = nanoid(10);

//   const portfolio = await portfolioModel.findByPk(req.params.id);
//   if (!portfolio) return next(new AppError(404, "Portfolio not found"));

//   // update portfolio url
//   if (url) portfolio.url = url;

//   // Upload image to cloudinary
//   if (req.file) {
//     await cloudinary.api.delete_resources_by_prefix(`Jobizaa/Portfolios/${portfolio.customId}`);
//     await cloudinary.api.delete_folder(`Jobizaa/Portfolios/${portfolio.customId}`);
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: `Jobizaa/Portfolios/${portfolio.customId}`,
//     });
//     portfolio.secure_url = result.secure_url;
//     portfolio.public_id = result.public_id;
//     portfolio.customId = customId;
//   }

//   res.status(200).json({ msg: "updated success" });
// };

// @desc    Delete Portfolio
// @route   delete /api/v1/portfolios/:id
export const deletePortfolio = async (req, res, next) => {
  await portfolioModel.destroy({ where: { id: req.params.id } });
  res.status(200).json({ msg: "deleted success" });
};
