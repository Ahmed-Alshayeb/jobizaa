import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import applicationModel from "./application.model.js";

const resumeModel = sequelize.define("Resume", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  secure_url: {
    type: DataTypes.STRING,
  },
  public_id: {
    type: DataTypes.STRING,
  },
  customId: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
});

// relation between application and resume
applicationModel.belongsTo(resumeModel);
resumeModel.hasMany(applicationModel);

export default resumeModel;
