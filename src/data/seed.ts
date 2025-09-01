import sequelize from "../config/database";
import Blague from "../models/Blague";

const seedBlagues = async () => {
  try {
    await sequelize.sync({ force: true });

    const blagues = [
      {
        question: "Quelle est la femelle du hamster ?",
        reponse: "L’Amsterdam",
      },
      {
        question: "Que dit un oignon quand il se cogne ?",
        reponse: "Aïe",
      },
      {
        question: "Quel est l'animal le plus heureux ?",
        reponse: "Le hibou, parce que sa femme est chouette.",
      },
      {
        question: "Pourquoi le football c'est rigolo ?",
        reponse: "Parce que Thierry en rit.",
      },
      {
        question: "Quel est le sport le plus fruité ?",
        reponse:
          "La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.",
      },
      {
        question: "Que se fait un Schtroumpf quand il tombe ?",
        reponse: "Un Bleu",
      },
      {
        question: "Quel est le comble pour un marin ?",
        reponse: "Avoir le nez qui coule",
      },
      {
        question: "Qu'est ce que les enfants usent le plus à l'école ?",
        reponse: "Le professeur",
      },
      {
        question: "Quel est le sport le plus silencieux ?",
        reponse: "Le para-chuuuut",
      },
      {
        question: "Quel est le comble pour un joueur de bowling ?",
        reponse: "C’est de perdre la boule",
      },
    ];

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
