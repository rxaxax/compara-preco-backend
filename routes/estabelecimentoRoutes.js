const express = require("express");
const estabelecimentoController = require("../controllers/estabelecimentoController");
const auth = require("../middlewares/autenticarToken");

const router = express.Router();

router.post(
  "/estabelecimentos",
  auth,
  estabelecimentoController.criarEstabelecimento
);
router.get(
  "/estabelecimentos",
  auth,
  estabelecimentoController.listarEstabelecimentos
);
router.put(
  "/estabelecimentos/:id",
  auth,
  estabelecimentoController.atualizarEstabelecimento
);
router.delete(
  "/estabelecimentos/:id",
  auth,
  estabelecimentoController.excluirEstabelecimento
);

module.exports = router;
