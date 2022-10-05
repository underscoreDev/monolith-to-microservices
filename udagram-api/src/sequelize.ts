import { config } from "./config/config";
import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  database: config.database,
  dialect: "postgres",
  host: config.host,
  username: config.username,
  password: config.password,
});
