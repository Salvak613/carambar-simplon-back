import { Sequelize } from "sequelize";
import path from "path";
import fs from "fs";

// Prefer explicit DB_PATH; otherwise write under the project root /db to avoid placing data in /dist
const dbPath =
  process.env.DB_PATH || path.join(process.cwd(), "db", "database.sqlite");

// Ensure the directory exists so SQLite can create the file
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
  logging: false,
  define: {
    timestamps: false,
  },
});

export default sequelize;
