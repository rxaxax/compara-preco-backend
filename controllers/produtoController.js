const Produto = require('../models/Produto');

exports.criarProduto = async (req, res) => {
  const { nome, preco } = req.body;
  try {
    const novo = new Produto({ nome, preco });
    await novo.save();
    res.status(201).json({ mensagem: 'Produto criado com sucesso' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao criar produto' });
  }
};

exports.listarProdutos = async (req, res) => {
  try {
    const lista = await Produto.find();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar produtos' });
  }
};
