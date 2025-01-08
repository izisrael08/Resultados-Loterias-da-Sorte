// Define a URL para o endpoint do servidor que retorna os resultados
const API_URL = '/get-results'; // Faz a requisição para o servidor backend

// Realiza a requisição para o servidor
fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }
    return response.json();  // Converte a resposta em formato JSON
  })
  .then(data => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Limpa mensagem de carregamento

    if (data.length === 0) {
      resultsDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
      return;
    }

    // Ordena os resultados pela chave "Premio"
    data.forEach(item => {
      item.Resultados.sort((a, b) => {
        const premioA = a.Premio ? parseInt(a.Premio.replace('°', '')) : 0;
        const premioB = b.Premio ? parseInt(b.Premio.replace('°', '')) : 0;
        return premioA - premioB;
      });

      let content = `
        <div class="result-card">
          <div class="result-header">
            <span class="result-time">${item.Hora}</span>
            <span class="result-title">${item.Titulo}</span>
            <span class="result-day">${item.Dia}</span>
          </div>
          <div class="result-details">
            <div class="result-prize"><strong>Prêmio</strong></div>
            <div class="result-result"><strong>Resultado</strong></div>
            <div class="result-group"><strong>Grupo</strong></div>
          </div>
          <div class="result-values">
            ${item.Resultados.map((resultado) => {
              return `
                <div class="result-value">
                  <span class="result-index">${resultado.Premio}</span>           
                  <span class="result-result-value">${resultado.Resultado}</span>
                  <span class="result-group-value">${resultado.Grupo}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
      resultsDiv.innerHTML += content;
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os resultados:', error);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>Ocorreu um erro ao carregar os resultados.</p>`;
  });
