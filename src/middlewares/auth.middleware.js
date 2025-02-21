import jwt from "jsonwebtoken";
import userModel from "../../DB/models/user.model.js";
import AppError from "../utils/ErrorClass.js";
import { config } from "dotenv";
config();

export const auth = () => {
  return async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
      return next(new AppError(400, "token is required"));
    }

    if (!token.startsWith(process.env.JWT_BEARER_KEY)) {
      return next(new AppError(400, "invalid token format"));
    }

    const newToken = token.split(process.env.JWT_BEARER_KEY)[1];
    if (!newToken) {
      return next(new AppError(400, "invalid token"));
    }

    const decoded = await jwt.verify(newToken, process.env.JWT_SECRET);
    if (!decoded?.id) {
      return next(new AppError(400, "invalid tokennn"));
    }

    const user = await userModel.findByPk(decoded.id);
    if (!user) {
      return next(new AppError(404, "user not found"));
    }

    if (parseInt(user?.passwordChangedAt?.getTime() / 1000) > decoded.iat) {
      return res.status(400).json({ msg: "password changed please login again" });
    }

    req.user = user;

    next();
  };
};
