const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do CORS (se necessário)
app.use(cors({
  origin: '*', // Permite acessos de qualquer origem
}));

// Endpoint para a API
app.get('/results', (req, res) => {
  res.json([
    {
      Titulo: "Resultado 1",
      Hora: "10:00",
      Resultados: [{ Resultado: "10" }, { Resultado: "20" }]
    },
    {
      Titulo: "Resultado 2",
      Hora: "12:00",
      Resultados: [{ Resultado: "30" }, { Resultado: "40" }]
    }
  ]);
});

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
