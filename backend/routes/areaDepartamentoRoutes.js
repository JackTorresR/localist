const express = require("express");
const router = express.Router();
const { autenticar } = require("../controllers/usuarioController");
const {
  criarAreaDepartamento,
  listarAreasDepartamentos,
  detalharAreaDepartamento,
  editarAreaDepartamento,
  deletarAreaDepartamento,
} = require("../controllers/areaDepartamentoController");

router.post("/", autenticar, criarAreaDepartamento);
router.get("/", autenticar, listarAreasDepartamentos);
router.get("/:id", autenticar, detalharAreaDepartamento);
router.patch("/:id", autenticar, editarAreaDepartamento);
router.delete("/:id", autenticar, deletarAreaDepartamento);

module.exports = router;
