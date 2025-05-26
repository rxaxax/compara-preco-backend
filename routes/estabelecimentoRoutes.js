const express = require('express');
const router = express.Router();

const estabelecimentoController = require('../controllers/estabelecimentoController');

router.post('/estabelecimentos', estabelecimentoController.criarEstabelecimento);
router.get('/estabelecimentos', estabelecimentoController.listarEstabelecimentos);

module.exports = router;
