const mongoose = require("mongoose");

const areaDepartamentoSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  ativo: { type: Boolean, default: true },
  dataCriacao: { type: Date, default: Date.now },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  tipo: {
    type: String,
    enum: ["Área", "Departamento"],
    required: true,
  },
  nome: { type: String, required: true, trim: true },
  nomeSemPontuacao: { type: String, required: true },
  descricao: { type: String, trim: true },
  responsavel: { type: String, required: false },
  status: {
    type: String,
    enum: ["Ativo", "Inativo"],
    default: "Ativo",
  },
  codigoArea: { type: String, trim: true },
});

module.exports =
  mongoose.models.AreaDepartamento ||
  mongoose.model(
    "AreaDepartamento",
    areaDepartamentoSchema,
    "areas_departamentos"
  );
