import express, { Request, Response } from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import sequelize from "./config/database";
import blagueRoutes from "./routes/blagueRoutes";
import { swaggerSpec } from "./config/swagger";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/blagues", blagueRoutes);

// Swagger UI & JSON
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get("/api-docs.json", (_req: Request, res: Response) => {
  res.json(swaggerSpec);
});

// Route de test
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "🎭 API Carambar en ligne !" });
});

// Initialisation de la base de données
sequelize.sync().then(() => {
  console.log("✅ Base SQLite prête !");
});

export default app;
