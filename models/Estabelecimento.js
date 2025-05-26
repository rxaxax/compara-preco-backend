const mongoose = require('mongoose');

const EstabelecimentoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true }
});

module.exports = mongoose.model('Estabelecimento', EstabelecimentoSchema);
