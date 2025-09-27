// Aguarda o conteúdo da página ser carregado para executar o script
document.addEventListener('DOMContentLoaded', function() {

    // 1. INICIALIZAÇÃO DO MAPA
    const map = L.map('map').setView([-7.059800, -35.317108], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 2. DADOS DOS PONTOS CULTURAIS
    const culturalSpots = [
        {
            name: 'Casa da Cultura de Mari',
            lat: -7.059875,
            lng: -35.317466,
            category: 'museu',
            description: 'Espaço dedicado à cultura local e exposições artísticas.'
        },
    ];

    // --- LÓGICA DOS FILTROS ---

    // Armazena os marcadores em um objeto para fácil acesso
    const markers = {};
    const markerLayer = L.layerGroup().addTo(map); // Camada para adicionar/remover marcadores

    // Função para criar e exibir os marcadores
    function displayMarkers(category) {
        // Limpa os marcadores existentes
        markerLayer.clearLayers();

        // Filtra os locais com base na categoria
        const filteredSpots = (category === 'todos')
            ? culturalSpots // Se for 'todos', usa a lista completa
            : culturalSpots.filter(spot => spot.category === category); // Senão, filtra

        // Adiciona os marcadores filtrados ao mapa
        filteredSpots.forEach(spot => {
            const marker = L.marker([spot.lat, spot.lng]);
            marker.bindPopup(`<b>${spot.name}</b><br>${spot.description}`);
            markerLayer.addLayer(marker);
        });
    }

    // Seleciona todos os botões de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Adiciona um "ouvinte" de clique a cada botão
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' ao botão clicado
            button.classList.add('active');

            // Pega a categoria do botão (do atributo 'data-category')
            const category = button.dataset.category;

            // Chama a função para exibir os marcadores da categoria selecionada
            displayMarkers(category);
        });
    });

    // --- FIM DA LÓGICA DOS FILTROS ---

    // Exibe todos os marcadores inicialmente ao carregar a página
    displayMarkers('todos');
});