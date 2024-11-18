const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true, autoIncrement: true },
  ativo: { type: Boolean, default: true },
  dataCriacao: { type: Date, default: Date.now },
  nome: { type: String, required: true },
  nomeSemPontuacao: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  usuario: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  telefone: { type: String },
  perfilAcesso: {
    type: String,
    enum: ["Administrativo", "Operacional"],
    required: true,
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
