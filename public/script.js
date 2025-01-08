const API_URL = 'https://resultados-loterias-da-sorte-production.up.railway.app/results'; // URL completa do endpoint

fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Limpa mensagem de carregamento

    if (data.length === 0) {
      resultsDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
      return;
    }

    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('result-card');
      card.innerHTML = `
        <div class="result-header">
          <span>${item.Titulo}</span>
          <span>${item.Hora}</span>
        </div>
        <div class="result-details">
          <strong>Prêmios:</strong> ${item.Resultados.map(r => r.Resultado).join(', ')}
        </div>
      `;
      resultsDiv.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar resultados:', error);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>Erro ao carregar os resultados. Tente novamente mais tarde.</p>`;
  });
