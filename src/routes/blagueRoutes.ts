import { Router, Request, Response } from "express";
import Blague from "../models/Blague";
import sequelize from "../config/database";
import { blagues } from "../data/blagues";

const router = Router();

// GET /api/blagues - Récupérer toutes les blagues
router.get("/", async (req: Request, res: Response) => {
  try {
    const blagues = await Blague.findAll();
    res.json(blagues);
  } catch (error) {
    console.error("Erreur lors de la récupération des blagues:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET /api/blagues/random - Récupérer une blague aléatoire (ORDER BY RANDOM())
router.get("/random", async (req: Request, res: Response) => {
  try {
    const blague = await Blague.findOne({
      order: sequelize.random(),
    });

    if (!blague) {
      return res.status(404).json({ error: "Aucune blague disponible" });
    }

    res.json(blague);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la blague aléatoire:",
      error
    );
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET /api/blagues/:id - Récupérer une blague par ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blague = await Blague.findByPk(id);

    if (!blague) {
      return res.status(404).json({ error: "Blague non trouvée" });
    }

    res.json(blague);
  } catch (error) {
    console.error("Erreur lors de la récupération de la blague:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST /api/blagues - Créer une nouvelle blague
router.post("/", async (req: Request, res: Response) => {
  try {
    const { question, reponse } = req.body;

    if (!question || !reponse) {
      return res
        .status(400)
        .json({ error: "Question et réponse sont obligatoires" });
    }

    const blague = await Blague.create({ question, reponse });
    res.status(201).json(blague);
  } catch (error) {
    console.error("Erreur lors de la création de la blague:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;

// Admin-only: seed database (one-time). Protect with SEED_TOKEN env var.
router.post("/seed", async (req: Request, res: Response) => {
  try {
    const auth = req.header("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : undefined;
    if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await sequelize.sync({ force: true });
    await Blague.bulkCreate(blagues);
    return res.json({ ok: true, count: blagues.length });
  } catch (e) {
    console.error("Seed error:", e);
    return res.status(500).json({ error: "Seed failed" });
  }
});
