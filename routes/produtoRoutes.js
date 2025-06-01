const express = require("express");
const produtoController = require("../controllers/produtoController");
const auth = require("../middlewares/autenticarToken");

const router = express.Router();

router.post("/produtos", auth, produtoController.criarProduto);
router.get("/produtos", auth, produtoController.listarProdutos);
router.post(
  "/produtos/:id/precos",
  auth,
  produtoController.adicionarPrecoAoProduto
);
router.delete("/produtos/:id", auth, produtoController.deletarProduto);
router.put("/produtos/:id", auth, produtoController.atualizarProduto);

module.exports = router;
