const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  ativo: { type: Boolean, default: true },
  dataCriacao: { type: Date, default: Date.now },
  nome: { type: String, required: true },
  nomeSemPontuacao: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  usuario: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  matricula: { type: String },
  funcao: { type: String },
  telefone: { type: String },
  perfilAcesso: {
    type: String,
    enum: ["Administrativo", "Cliente", "Operacional"],
    required: true,
  },
});

const Usuario =
  mongoose.models.Usuario || mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
