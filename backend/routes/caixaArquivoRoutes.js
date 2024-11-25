const express = require("express");
const caixaArquivoController = require("../controllers/caixaArquivoController");
const { autenticar } = require("../controllers/usuarioController");

const router = express.Router();

router.post("/", caixaArquivoController.criarCaixaArquivo);
router.get("/", caixaArquivoController.listarCaixasArquivos);
router.get("/:id", caixaArquivoController.detalharCaixaArquivo);
router.patch("/:id", caixaArquivoController.editarCaixaArquivo);
router.delete("/:id", caixaArquivoController.deletarCaixaArquivo);
router.put(
  "/:id/descartar",
  autenticar,
  caixaArquivoController.descartarCaixaArquivo
);

module.exports = router;
