import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
