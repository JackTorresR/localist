const express = require("express");
const router = express.Router();
const {
  criarAreaDepartamento,
  listarAreasDepartamentos,
  detalharAreaDepartamento,
  editarAreaDepartamento,
  deletarAreaDepartamento,
} = require("../controllers/areaDepartamentoController");

router.post("/", criarAreaDepartamento);
router.get("/", listarAreasDepartamentos);
router.get("/:id", detalharAreaDepartamento);
router.put("/:id", editarAreaDepartamento);
router.delete("/:id", deletarAreaDepartamento);

module.exports = router;
