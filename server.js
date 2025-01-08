// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa as dependências necessárias
const express = require('express');
const axios = require('axios');
const app = express();

// Pega a URL da API do arquivo .env
const apiUrl = process.env.API_URL;

// Configura o servidor para servir arquivos estáticos (como o frontend)
app.use(express.static('public'));

// Endpoint para pegar os resultados da API
app.get('/get-results', async (req, res) => {
  try {
    const response = await axios.get(apiUrl); // Faz a requisição para a API real
    res.json(response.data);  // Retorna os dados da API para o frontend
  } catch (error) {
    console.error('Erro ao buscar resultados:', error);
    res.status(500).send('Erro ao carregar resultados.');
  }
});

// Define a porta do servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
