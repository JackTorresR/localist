const express = require("express");
const clienteController = require("../controllers/clienteController");

const rota = express.Router();

rota.post("/", clienteController.criarCliente);
rota.get("/", clienteController.listarClientes);
rota.get("/:id", clienteController.detalharCliente);
rota.patch("/:id", clienteController.editarCliente);
rota.delete("/:id", clienteController.deletarCliente);

module.exports = rota;
