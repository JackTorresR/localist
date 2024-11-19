require("dotenv").config();
const cors = require("cors");

const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const caixaArquivoRoutes = require("./routes/caixaArquivoRoutes");
const areaDepartamentoRoutes = require("./routes/areaDepartamentoRoutes");
const especieDocumentalRoutes = require("./routes/especieDocumentalRoutes");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/usuario", usuarioRoutes);
app.use("/cliente", clienteRoutes);
app.use("/caixa-arquivo", caixaArquivoRoutes);
app.use("/area-departamento", areaDepartamentoRoutes);
app.use("/especie-documental", especieDocumentalRoutes);

module.exports = app;
