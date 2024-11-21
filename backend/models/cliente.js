const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  ativo: { type: Boolean, default: true },
  dataCriacao: { type: Date, default: Date.now },
  nome: { type: String, required: true },
  nomeSemPontuacao: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String },
  endereco: { type: String },
  perfilAcesso: {
    type: String,
    enum: ["Cliente", "Parceiro", "Fornecedor"],
    required: true,
  },
});

module.exports =
  mongoose.models.Cliente || mongoose.model("Cliente", clienteSchema);
