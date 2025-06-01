const mongoose = require("mongoose");

const historicoSchema = new mongoose.Schema({
  preco: { type: Number, required: true },
  data: { type: Date, default: Date.now },
  estabelecimento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estabelecimento",
    required: true,
  },
});

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  historicoPrecos: [historicoSchema],
});

module.exports = mongoose.model("Produto", produtoSchema);
