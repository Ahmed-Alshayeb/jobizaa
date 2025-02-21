import { Sequelize } from "sequelize";
import mysql from "mysql2";
import { config } from "dotenv";
config();

export const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: "mysql",
  dialectModule: mysql,
});

const connectionDB = async () => {
  await sequelize
    .sync()
    .then(() => {
      console.log("Database connected...");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
};

export default connectionDB;
