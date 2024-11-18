const express = require("express");
const usuarioController = require("../controllers/usuarioController");

const rota = express.Router();

rota.post("/", usuarioController.criarUsuario);
rota.get("/", usuarioController.listarUsuarios);
rota.get("/:id", usuarioController.detalharUsuario);
rota.patch("/:id", usuarioController.editarUsuario);
rota.delete("/:id", usuarioController.deletarUsuario);
rota.post("/acesso", usuarioController.acessarSistema);
rota.post("/validar", usuarioController.validarAcesso);
rota.put("/editar-senha", usuarioController.editarSenha);

module.exports = rota;
