const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/usuarios", userController.cadastrarUsuario);
router.post("/login", userController.loginUsuario);

module.exports = router;
