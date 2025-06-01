const Produto = require("../models/Produto");
const Estabelecimento = require("../models/Estabelecimento");

exports.criarProduto = async (req, res) => {
  try {
    const { nome, historicoPrecos } = req.body;
    const userId = req.userId;

    if (
      !nome ||
      !Array.isArray(historicoPrecos) ||
      historicoPrecos.length === 0 ||
      !historicoPrecos[0].preco ||
      !historicoPrecos[0].estabelecimento
    ) {
      return res
        .status(400)
        .json({ mensagem: "Dados incompletos para criação do produto" });
    }

    const historico = historicoPrecos[0];

    const estabelecimentoDoc = await Estabelecimento.findById(
      historico.estabelecimento
    );

    if (!estabelecimentoDoc) {
      console.log("Estabelecimento não encontrado:", historico.estabelecimento);
      return res
        .status(404)
        .json({ mensagem: "Estabelecimento não encontrado" });
    }

    let produto = await Produto.findOne({ nome, usuario: userId });

    if (produto) {
      produto.historicoPrecos.push({
        preco: historico.preco,
        estabelecimento: historico.estabelecimento,
        data: new Date(),
      });
      await produto.save();
      return res.status(200).json({
        mensagem: "Histórico de preço adicionado ao produto existente",
      });
    } else {
      const novoProduto = new Produto({
        usuario: req.userId,
        nome,
        historicoPrecos: [
          {
            preco: historico.preco,
            estabelecimento: estabelecimentoDoc._id,
            data: new Date(),
          },
        ],
      });

      console.log("Novo produto:", JSON.stringify(novoProduto));

      await novoProduto.save();
      console.log("Produto criado com sucesso!");
      res.status(201).json({ mensagem: "Produto criado com sucesso" });
    }
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    res.status(500).json({ mensagem: "Erro ao criar produto" });
  }
};

exports.adicionarPrecoAoProduto = async (req, res) => {
  const { preco, estabelecimentoId } = req.body;
  const produtoId = req.params.id;

  try {
    const produto = await Produto.findById(produtoId);
    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    const estabelecimento = await Estabelecimento.findById(estabelecimentoId);
    if (!estabelecimento) {
      return res
        .status(404)
        .json({ mensagem: "Estabelecimento não encontrado" });
    }

    const novoPreco = {
      preco,
      estabelecimento: estabelecimentoId,
      data: new Date(),
    };

    produto.historicoPrecos.push(novoPreco);
    await produto.save();

    res.status(201).json({ mensagem: "Preço adicionado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao adicionar preço ao produto" });
  }
};

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find({ usuario: req.userId }).populate(
      "historicoPrecos.estabelecimento"
    );

    const produtosComId = produtos.map((produto) => ({
      id: produto._id,
      nome: produto.nome,
      historicoPrecos: produto.historicoPrecos,
    }));

    res.json(produtosComId);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar produtos" });
  }
};

exports.deletarProduto = async (req, res) => {
  try {
    const produtoId = req.params.id;
    const userId = req.userId;

    const produto = await Produto.findOneAndDelete({
      _id: produtoId,
      usuario: userId,
    });

    if (!produto) {
      return res
        .status(404)
        .json({
          mensagem: "Produto não encontrado ou não pertence ao usuário",
        });
    }

    res.status(200).json({ mensagem: "Produto excluído com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar produto:", err);
    res.status(500).json({ mensagem: "Erro ao deletar produto" });
  }
};

exports.atualizarProduto = async (req, res) => {
  const produtoId = req.params.id;
  const userId = req.userId;
  const { nome, historicoPrecos } = req.body;

  try {
    // Busca produto do usuário
    const produto = await Produto.findOne({ _id: produtoId, usuario: userId });
    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    // Atualiza o nome se fornecido
    if (nome) produto.nome = nome;

    // Atualiza o histórico de preços se fornecido
    if (Array.isArray(historicoPrecos) && historicoPrecos.length > 0) {
      // Aqui você pode escolher como atualizar: sobrescrever ou adicionar.
      // Vou adicionar ao array:
      historicoPrecos.forEach((item) => {
        produto.historicoPrecos.push({
          preco: item.preco,
          estabelecimento: item.estabelecimento,
          data: new Date(),
        });
      });
    }

    await produto.save();

    return res
      .status(200)
      .json({ mensagem: "Produto atualizado com sucesso", produto });
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    return res.status(500).json({ mensagem: "Erro ao atualizar produto" });
  }
};
