const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const estabelecimentoRoutes = require("./routes/estabelecimentoRoutes");
const produtoRoutes = require("./routes/produtoRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", estabelecimentoRoutes);
app.use("/api", produtoRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
  })
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
