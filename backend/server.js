require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const ENV = process.env.APP_ENV || "LOCAL";

const nomeBanco = "localist";
const PORT = "5160";
let MONGO_URI = `mongodb://localhost:27017/${nomeBanco}`;

if (ENV === "PRODUCAO") {
  MONGO_URI = `mongodb://localist:Nagel1029!@documentos.nagelconsultoria.com.br:37170/${nomeBanco}`;
}

const config = { MONGO_URI, PORT };

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log(`Conectado ao banco de dados no ambiente: ${ENV}`);

    app.listen(config.PORT, () => {
      console.log(`Job iniciado com sucesso na porta: ${config.PORT}`);
    });
  })
  .catch((error) =>
    console.error("Erro ao conectar ao banco de dados:", error)
  );
