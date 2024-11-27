const express = require("express");
const { autenticar } = require("../controllers/usuarioController");
const {
  criarCaixaArquivo,
  listarCaixasArquivos,
  detalharCaixaArquivo,
  editarCaixaArquivo,
  deletarCaixaArquivo,
  descartarCaixaArquivo,
} = require("../controllers/caixaArquivoController");

const router = express.Router();

router.post("/", autenticar, criarCaixaArquivo);
router.get("/", autenticar, listarCaixasArquivos);
router.get("/:id", autenticar, detalharCaixaArquivo);
router.patch("/:id", autenticar, editarCaixaArquivo);
router.delete("/:id", autenticar, deletarCaixaArquivo);
router.put("/:id/descartar", autenticar, descartarCaixaArquivo);

module.exports = router;
