import sequelize from "../config/database";
import Blague from "../models/Blague";
import { blagues } from "./blagues";

const seedBlagues = async () => {
  try {
    await sequelize.sync({ force: true });

    await Blague.bulkCreate(blagues);
    console.log(
      "✅ Base de données initialisée avec",
      blagues.length,
      "blagues !"
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation:", error);
    process.exit(1);
  }
};

seedBlagues();
