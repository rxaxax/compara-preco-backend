const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = new Usuario({ nome, email, senha: senhaCriptografada });
    await novoUsuario.save();

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  const secret = process.env.JWT_SECRET;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: usuario._id }, secret, {
      expiresIn: "1h",
    });
    res.json({
      mensagem: "Login realizado com sucesso",
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro no servidor" });
  }
};
