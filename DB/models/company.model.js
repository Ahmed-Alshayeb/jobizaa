import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";

const companyModel = sequelize.define("Company", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  websiteURL: {
    type: DataTypes.STRING,
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

export default companyModel;
