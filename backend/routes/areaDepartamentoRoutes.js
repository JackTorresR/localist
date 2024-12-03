const express = require("express");
const router = express.Router();
const {
  autenticar,
  verificarPermissao,
} = require("../controllers/usuarioController");
const {
  criarAreaDepartamento,
  listarAreasDepartamentos,
  editarAreaDepartamento,
  deletarAreaDepartamento,
} = require("../controllers/areaDepartamentoController");

const entidade = "AREA_DEPARTAMENTO_";

router.post(
  "/",
  autenticar,
  verificarPermissao(`${entidade}CRIAR`),
  criarAreaDepartamento
);

router.get(
  "/",
  autenticar,
  verificarPermissao(`${entidade}LISTAR`),
  listarAreasDepartamentos
);

router.patch(
  "/:id",
  autenticar,
  verificarPermissao(`${entidade}EDITAR`),
  editarAreaDepartamento
);

router.delete(
  "/:id",
  autenticar,
  verificarPermissao(`${entidade}DELETAR`),
  deletarAreaDepartamento
);

module.exports = router;
