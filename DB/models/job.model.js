import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import { jobExperience, jobStatus, jobTime, workPlace } from "../../src/utils/generalFile.js";
import companyModel from "./company.model.js";
import categoryModel from "./category.model.js";

const jobModel = sequelize.define("Job", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  jobTitle: {
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
  jobTime: {
    type: DataTypes.ENUM(Object.values(jobTime)),
    allowNull: false,
  },
  workPlace: {
    type: DataTypes.ENUM(Object.values(workPlace)),
    allowNull: false,
  },
  jobExperience: {
    type: DataTypes.ENUM(Object.values(jobExperience)),
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  requirements: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(Object.values(jobStatus)),
    defaultValue: jobStatus.open,
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

// relation between job and company
jobModel.belongsTo(companyModel);
companyModel.hasMany(jobModel);

// relation between job and category
jobModel.belongsTo(categoryModel);
categoryModel.hasMany(jobModel);

export default jobModel;
