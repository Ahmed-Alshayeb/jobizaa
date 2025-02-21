import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";

const categoryModel = sequelize.define("Category", {
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
  slug: {
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

export default categoryModel;
