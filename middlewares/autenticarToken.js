const jwt = require("jsonwebtoken");
require("dotenv").config();


function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const secret = process.env.JWT_SECRET;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ mensagem: "Token não fornecido ou inválido" });
  }

  const token = authHeader.slice(7);

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensagem: "Token inválido" });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = autenticarToken;
