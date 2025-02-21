import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import { applicationStatus } from "../../src/utils/generalFile.js";
import jobModel from "./job.model.js";
import portfolioModel from "./portfolio.model.js";

const applicationModel = sequelize.define("Application", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  coverLetter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(Object.values(applicationStatus)),
    allowNull: false,
    defaultValue: applicationStatus.applied,
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

// relation between application and job
applicationModel.belongsTo(jobModel);
jobModel.hasMany(applicationModel);

// relation between application and portfolio
applicationModel.belongsTo(portfolioModel);
portfolioModel.hasMany(applicationModel);

export default applicationModel;
