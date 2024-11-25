const express = require("express");
const router = express.Router();
const especieDocumentalController = require("../controllers/especieDocumentalController");

router.post("/", especieDocumentalController.criarEspecieDocumental);
router.get("/", especieDocumentalController.listarEspeciesDocumentais);
router.get("/:id", especieDocumentalController.detalharEspecieDocumental);
router.patch("/:id", especieDocumentalController.editarEspecieDocumental);
router.delete("/:id", especieDocumentalController.deletarEspecieDocumental);

module.exports = router;
