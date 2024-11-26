const express = require("express");
const { autenticar } = require("../controllers/usuarioController");
const {
  criarCliente,
  listarClientes,
  detalharCliente,
  editarCliente,
  deletarCliente,
} = require("../controllers/clienteController");

const rota = express.Router();

rota.post("/", autenticar, criarCliente);
rota.get("/", autenticar, listarClientes);
rota.get("/:id", autenticar, detalharCliente);
rota.patch("/:id", autenticar, editarCliente);
rota.delete("/:id", autenticar, deletarCliente);

module.exports = rota;
