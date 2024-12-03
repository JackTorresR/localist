const express = require("express");
const router = express.Router();
const { autenticar } = require("../controllers/usuarioController");
const {
  criarEspecieDocumental,
  listarEspeciesDocumentais,
  editarEspecieDocumental,
  deletarEspecieDocumental,
} = require("../controllers/especieDocumentalController");

router.post("/", autenticar, criarEspecieDocumental);
router.get("/", autenticar, listarEspeciesDocumentais);
router.patch("/:id", autenticar, editarEspecieDocumental);
router.delete("/:id", autenticar, deletarEspecieDocumental);

module.exports = router;
