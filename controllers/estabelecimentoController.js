const Estabelecimento = require('../models/Estabelecimento');

exports.criarEstabelecimento = async (req, res) => {
  const { nome, endereco } = req.body;
  try {
    const novo = new Estabelecimento({ nome, endereco });
    await novo.save();
    res.status(201).json({ mensagem: 'Estabelecimento criado com sucesso' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao criar estabelecimento' });
  }
};

exports.listarEstabelecimentos = async (req, res) => {
  try {
    const lista = await Estabelecimento.find();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar estabelecimentos' });
  }
};
