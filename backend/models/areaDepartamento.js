const mongoose = require("mongoose");

const areaDepartamentoSchema = new mongoose.Schema({
  ativo: { type: Boolean, default: true },
  dataCriacao: { type: Date, default: Date.now },
  nome: { type: String, required: true, trim: true },
  nomeSemPontuacao: { type: String, required: true },
  sigla: { type: String, required: true, trim: true },
  responsavel: { type: String, required: false },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  codigoArea: { type: String, trim: true },
  tipo: {
    type: String,
    enum: ["Área", "Departamento"],
    required: true,
  },
  descricao: { type: String, trim: true },
});

module.exports =
  mongoose.models.AreaDepartamento ||
  mongoose.model(
    "AreaDepartamento",
    areaDepartamentoSchema,
    "areas_departamentos"
  );
