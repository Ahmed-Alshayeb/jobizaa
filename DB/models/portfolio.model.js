import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";

const portfolioModel = sequelize.define("Portfolio", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
  },
  secure_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  public_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customId: {
    type: DataTypes.STRING,
    allowNull: true,
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

export default portfolioModel;
