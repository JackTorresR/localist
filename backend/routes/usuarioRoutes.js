const express = require("express");
const {
  autenticar,
  criarUsuario,
  listarUsuarios,
  editarUsuario,
  deletarUsuario,
  acessarSistema,
  validarAcesso,
  editarSenha,
} = require("../controllers/usuarioController");

const rota = express.Router();

rota.post("/", autenticar, criarUsuario);
rota.get("/", autenticar, listarUsuarios);
rota.patch("/:id", autenticar, editarUsuario);
rota.delete("/:id", autenticar, deletarUsuario);
rota.post("/acesso", acessarSistema);
rota.post("/validar", validarAcesso);
rota.put("/editar-senha", autenticar, editarSenha);

module.exports = rota;
