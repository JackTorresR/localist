const mongoose = require("mongoose");

const caixaArquivoSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  ativo: { type: Boolean, default: true },
  dataCriacao: { type: Date, default: Date.now },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  idEspecieDocumental: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EspecieDocumental",
    required: true,
  },
  anoDocumentos: { type: String, required: true },
  dataArmazenamento: { type: Date, required: true },
  dataExpiracao: { type: Date, required: true },
  situacao: {
    type: String,
    enum: ["Em Prazo", "Aguardando descarte", "Descartado"],
    required: true,
  },
  observacoes: { type: String, required: false },
});

const CaixaArquivo =
  mongoose.models.CaixaArquivo ||
  mongoose.model("CaixaArquivo", caixaArquivoSchema, "caixas_arquivos");

module.exports = CaixaArquivo;
