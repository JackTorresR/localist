require("dotenv").config();
const cors = require("cors");

const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const areaDepartamentoRoutes = require("./routes/areaDepartamentoRoutes");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/usuario", usuarioRoutes);
app.use("/cliente", clienteRoutes);
app.use("/area-departamento", areaDepartamentoRoutes);

module.exports = app;
