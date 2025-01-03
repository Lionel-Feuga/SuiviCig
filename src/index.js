const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const sequelize = require("./config/db");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie.");

    await sequelize.sync({ alter: false });
    console.log("Base de données synchronisée.");
  } catch (error) {
    console.error(
      "Erreur lors de la synchronisation de la base de données :",
      error
    );
    process.exit(1);
  }
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await syncDatabase();
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
