import { Sequelize } from "sequelize";
import path from "path";

const dbPath =
  process.env.DB_PATH || path.join(__dirname, "../../db/database.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
  logging: false,
  define: {
    timestamps: false,
  },
});

export default sequelize;
