require("dotenv").config();
const cors = require("cors");

const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/usuario", usuarioRoutes);

module.exports = app;
