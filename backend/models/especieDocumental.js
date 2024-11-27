const mongoose = require("mongoose");

const especieDocumentalSchema = new mongoose.Schema({
  ativo: { type: Boolean, default: true },
  dataCriacao: { type: Date, default: Date.now },
  nome: { type: String, required: true },
  nomeSemPontuacao: { type: String, required: true },
  descricao: { type: String, trim: true },
  retencao: { type: Number, required: true },
  tipoRetencao: { type: String, enum: ["Dia", "Mês", "Ano"], required: true },
  categoria: {
    type: String,
    enum: ["Pessoal", "Empresarial", "Fiscal", "Outros"],
    required: true,
  },
  idAreaDepartamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AreaDepartamento",
    required: true,
  },
});

const EspecieDocumental =
  mongoose.models.EspecieDocumental ||
  mongoose.model(
    "EspecieDocumental",
    especieDocumentalSchema,
    "especies_documentais"
  );

module.exports = EspecieDocumental;
