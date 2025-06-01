const Estabelecimento = require("../models/Estabelecimento");

exports.criarEstabelecimento = async (req, res) => {
  const { nome, endereco } = req.body;
  try {
    const novo = new Estabelecimento({ nome, endereco, userId: req.userId });
    await novo.save();
    res.status(201).json(novo.toJSON());
  } catch (err) {
    res
      .status(500)
      .json({ mensagem: "Erro ao criar estabelecimento", erro: err.message });
  }
};

exports.listarEstabelecimentos = async (req, res) => {
  try {
    const lista = await Estabelecimento.find({ userId: req.userId });
    res.json(lista);
  } catch (err) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar estabelecimentos", erro: err.message });
  }
};

exports.atualizarEstabelecimento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, endereco } = req.body;

    const atualizado = await Estabelecimento.findByIdAndUpdate(
      id,
      { nome, endereco },
      { new: true }
    );

    if (!atualizado) {
      return res
        .status(404)
        .json({ mensagem: "Estabelecimento não encontrado." });
    }

    res.json({ mensagem: "Estabelecimento atualizado com sucesso." });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao atualizar.", erro: error.message });
  }
};

exports.excluirEstabelecimento = async (req, res) => {
  try {
    const { id } = req.params;

    const excluido = await Estabelecimento.findByIdAndDelete(id);

    if (!excluido) {
      return res
        .status(404)
        .json({ mensagem: "Estabelecimento não encontrado." });
    }

    res.json({ mensagem: "Estabelecimento excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao excluir.", erro: error.message });
  }
};
