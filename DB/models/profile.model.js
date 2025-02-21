import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import user_educationModel from "./user_education.model.js";
import user_experienceModel from "./user_experience.model.js";
import resumeModel from "./resume.model.js";
import portfolioModel from "./portfolio.model.js";
import applicationModel from "./application.model.js";

const profileModel = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  jobTitle: {
    type: DataTypes.STRING,
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

// relation between profile and user_education
profileModel.hasMany(user_educationModel);
user_educationModel.belongsTo(profileModel);

// relation between profile and user_experience
profileModel.hasMany(user_experienceModel);
user_experienceModel.belongsTo(profileModel);

// relation between profile and resume
profileModel.hasMany(resumeModel); 
resumeModel.belongsTo(profileModel);

// relation between profile and portfolio
profileModel.hasMany(portfolioModel);
portfolioModel.belongsTo(profileModel);

// relation between application and profile
profileModel.hasMany(applicationModel);
applicationModel.belongsTo(profileModel);

 

export default profileModel;
