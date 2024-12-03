const express = require("express");
const {
  autenticar,
  verificarPermissao,
} = require("../controllers/usuarioController");
const {
  criarCaixaArquivo,
  listarCaixasArquivos,
  editarCaixaArquivo,
  deletarCaixaArquivo,
  descartarCaixaArquivo,
} = require("../controllers/caixaArquivoController");

const router = express.Router();

const entidade = "CAIXA_ARQUIVO_";

router.post(
  "/",
  autenticar,
  verificarPermissao(`${entidade}CRIAR`),
  criarCaixaArquivo
);

router.get(
  "/",
  autenticar,
  verificarPermissao(`${entidade}LISTAR`),
  listarCaixasArquivos
);

router.patch(
  "/:id",
  autenticar,
  verificarPermissao(`${entidade}EDITAR`),
  editarCaixaArquivo
);

router.delete(
  "/:id",
  autenticar,
  verificarPermissao(`${entidade}DELETAR`),
  deletarCaixaArquivo
);

router.put(
  "/:id/descartar",
  autenticar,
  verificarPermissao(`${entidade}DESCARTAR`),
  descartarCaixaArquivo
);

module.exports = router;
