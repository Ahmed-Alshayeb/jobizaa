import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import { systemProviders } from "../../src/utils/generalFile.js";
import profileModel from "./profile.model.js";

const userModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.BIGINT,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
  },
  confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  provider: {
    type: DataTypes.ENUM(Object.values(systemProviders)),
    defaultValue: systemProviders.system,
  },
  providerId: {
    type: DataTypes.STRING,
  },
  OTP: {
    type: DataTypes.STRING,
  },
  passChangeAt: {
    type: DataTypes.DATE,
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

// relation between user and profile
userModel.hasMany(profileModel);
profileModel.belongsTo(userModel);

export default userModel;
