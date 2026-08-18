// BASE DE DATOS DE PLANTAS EN STOCK (VIVERO BOUTIQUE)
const PLANT_DATABASE = [
    {
        id: 'jazmin-cabo',
        name: 'Jazmín del Cabo',
        scientific: 'Gardenia jasminoides',
        category: 'ornamentales',
        description: 'Arbusto de follaje perenne verde oscuro brillante y flores blancas sumamente perfumadas.',
        price: 'Desde $3.200',
        features: ['☀️ Media sombra / Sol', '💧 Riego moderado', '🌸 Floración primaveral'],
        image: './img/Fotos/flor.jpg',
        badge: 'Popular'
    },
    {
        id: 'lavanda',
        name: 'Lavanda',
        scientific: 'Lavandula dentata',
        category: 'ornamentales',
        description: 'Arbusto aromático ideal para borduras y macetas, atrae polinizadores con sus espigas lilas.',
        price: 'Desde $1.800',
        features: ['☀️ Pleno sol', '💧 Riego escaso', '🐝 Atrae abejas y mariposas'],
        image: './img/Fotos/flor.jpg',
        badge: 'Bajo Riego'
    },
    {
        id: 'rosal-arbustivo',
        name: 'Rosal Arbustivo',
        scientific: 'Rosa hybrid',
        category: 'ornamentales',
        description: 'Plantas seleccionadas de excelente sanidad y floración continua durante primavera y verano.',
        price: 'Desde $2.900',
        features: ['☀️ Pleno sol', '💧 Riego regular', '🌹 Colores variados'],
        image: './img/Fotos/flor.jpg',
        badge: 'Clásico'
    },
    {
        id: 'limonero',
        name: 'Limonero 4 Estaciones',
        scientific: 'Citrus limon',
        category: 'frutales',
        description: 'Árbol cítrico que florece y fructifica durante todo el año. Hojas y flores muy aromáticas.',
        price: 'Desde $7.500',
        features: ['☀️ Pleno sol', '💧 Riego abundante', '🍋 Producción continua'],
        image: './img/Fotos/uva.jpg',
        badge: 'Destacado'
    },
    {
        id: 'naranjo',
        name: 'Naranjo Dulce',
        scientific: 'Citrus sinensis',
        category: 'frutales',
        description: 'Árbol frutal de copa redondeada, flores de azahar perfumadas y deliciosas naranjas de jugo.',
        price: 'Desde $7.200',
        features: ['☀️ Pleno sol', '💧 Riego medio-alto', '🍊 Ricas en Vitamina C'],
        image: './img/Fotos/uva.jpg',
        badge: 'Productivo'
    },
    {
        id: 'higuera',
        name: 'Higuera',
        scientific: 'Ficus carica',
        category: 'frutales',
        description: 'Árbol rústico de hojas lobuladas grandes, excelente sombra y frutos dulces a fines de verano.',
        price: 'Desde $5.800',
        features: ['☀️ Pleno sol', '💧 Riego moderado', '🍇 Higos dulces'],
        image: './img/Fotos/uva.jpg',
        badge: 'Rústico'
    },
    {
        id: 'jacaranda',
        name: 'Jacarandá',
        scientific: 'Jacaranda mimosifolia',
        category: 'nativas',
        description: 'Árbol nativo de gran porte, famoso por su espectacular floración lila azulada a mediados de primavera.',
        price: 'Desde $4.800',
        features: ['☀️ Pleno sol', '💧 Riego medio', '💜 Flores azul-violáceas'],
        image: './img/Fotos/pine.jpg',
        badge: 'Nativo'
    },
    {
        id: 'ceibo',
        name: 'Ceibo',
        scientific: 'Erythrina crista-galli',
        category: 'nativas',
        description: 'Árbol autóctono que produce flores rojas intensas. Flor Nacional de la República Argentina.',
        price: 'Desde $4.500',
        features: ['☀️ Pleno sol', '💧 Riego alto', '🔴 Flor Nacional'],
        image: './img/Fotos/pine.jpg',
        badge: 'Nativo'
    },
    {
        id: 'lapacho-rosado',
        name: 'Lapacho Rosado',
        scientific: 'Handroanthus impetiginosus',
        category: 'nativas',
        description: 'Árbol nativo de bellísimas flores rosadas acampanadas que brotan antes de las hojas.',
        price: 'Desde $5.200',
        features: ['☀️ Pleno sol', '💧 Riego medio', '🌸 Floración rosa espectacular'],
        image: './img/Fotos/pine.jpg',
        badge: 'Nativo'
    },
    {
        id: 'plantin-menta',
        name: 'Plantín de Menta',
        scientific: 'Mentha spicata',
        category: 'plantines',
        description: 'Hierba aromática de crecimiento rápido, ideal para macetas y para aromatizar bebidas e infusiones.',
        price: 'Desde $650',
        features: ['☀️ Media sombra', '💧 Riego constante', '🍃 Súper aromática'],
        image: './img/Fotos/TALLO.jpg',
        badge: 'Huerta'
    },
    {
        id: 'plantin-albahaca',
        name: 'Plantín de Albahaca',
        scientific: 'Ocimum basilicum',
        category: 'plantines',
        description: 'Plantín de albahaca de hoja ancha, esencial para tus comidas mediterráneas y huerta casera.',
        price: 'Desde $650',
        features: ['☀️ Pleno sol / Protegido', '💧 Riego regular', '🥗 Ideal Pesto'],
        image: './img/Fotos/TALLO.jpg',
        badge: 'Huerta'
    },
    {
        id: 'plantin-romero',
        name: 'Plantín de Romero',
        scientific: 'Salvia rosmarinus',
        category: 'plantines',
        description: 'Arbusto rústico y leñoso muy aromático, excelente condimento culinario de larga duración.',
        price: 'Desde $750',
        features: ['☀️ Pleno sol', '💧 Riego escaso', '🍗 Uso culinario'],
        image: './img/Fotos/TALLO.jpg',
        badge: 'Rústico'
    }
];

// GESTIÓN DE BOLSA DE COTIZACIÓN (STATE)
let quoteBag = [];

// CARGAR BOLSA DESDE SESSION STORAGE
function loadQuoteBag() {
    try {
        const stored = localStorage.getItem('vf_quote_bag');
        if (stored) {
            quoteBag = JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error al cargar la bolsa:', e);
        quoteBag = [];
    }
}

// GUARDAR BOLSA
function saveQuoteBag() {
    try {
        localStorage.setItem('vf_quote_bag', JSON.stringify(quoteBag));
    } catch (e) {
        console.error('Error al guardar la bolsa:', e);
    }
}

// INICIALIZACIÓN DEL CATÁLOGO
function initCatalog() {
    const grid = document.getElementById('vivero-catalog-grid');
    const searchInput = document.getElementById('plant-search');
    const filterTabs = document.querySelectorAll('.filter-tab');

    if (!grid) return;

    // Render inicial
    renderCatalog(PLANT_DATABASE);

    // Evento buscador
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterAndRender();
        });
    }

    // Evento filtros
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterAndRender();
        });
    });
}

// FILTRAR Y RENDERIZAR
function filterAndRender() {
    const searchInput = document.getElementById('plant-search');
    const activeTab = document.querySelector('.filter-tab.active');
    
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const filter = activeTab ? activeTab.getAttribute('data-filter') : 'all';

    let filtered = PLANT_DATABASE;

    // Aplicar filtro de pestaña
    if (filter !== 'all') {
        filtered = filtered.filter(item => item.category === filter);
    }

    // Aplicar filtro de búsqueda
    if (query !== '') {
        filtered = filtered.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.scientific.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );
    }

    renderCatalog(filtered);
}

// RENDERIZAR PLANTAS EN EL GRID
function renderCatalog(items) {
    const grid = document.getElementById('vivero-catalog-grid');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="catalog-no-results">
                <span class="no-results-icon">🌿</span>
                <h3>No se encontraron plantas</h3>
                <p>Prueba buscando con otros términos o seleccionando otra categoría.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map(item => {
        // Verificar si ya está en la bolsa para mostrar cantidades o botones
        const bagItem = quoteBag.find(b => b.id === item.id);
        const inBag = !!bagItem;
        
        return `
            <div class="producto-card" data-product-id="${item.id}" data-category="${item.category}">
                <div class="producto-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    ${item.badge ? `<div class="producto-badge">${item.badge}</div>` : ''}
                </div>
                <div class="producto-content">
                    <span class="scientific-name">${item.scientific}</span>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <ul class="producto-features">
                        ${item.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                    <div class="product-footer-row">
                        <span class="product-price">${item.price}</span>
                        <div class="action-buttons-wrap">
                            ${inBag ? `
                                <div class="quantity-controller-inline">
                                    <button class="qty-btn-inline minus" onclick="changeQty('${item.id}', -1)">-</button>
                                    <span class="qty-val-inline">${bagItem.quantity}</span>
                                    <button class="qty-btn-inline plus" onclick="changeQty('${item.id}', 1)">+</button>
                                </div>
                            ` : `
                                <button class="btn btn-primary btn-add-bag" onclick="addToBag('${item.id}')">
                                    <span>Agregar</span> 🌱
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// LÓGICA DE BOLSA DE COTIZACIÓN (MÉTODOS GLOBALES PARA BOTONES ONCLICK)
window.addToBag = function(productId) {
    const plant = PLANT_DATABASE.find(p => p.id === productId);
    if (!plant) return;

    const existing = quoteBag.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        quoteBag.push({
            id: plant.id,
            name: plant.name,
            scientific: plant.scientific,
            price: plant.price,
            quantity: 1
        });
    }

    saveQuoteBag();
    updateBagUI();
    filterAndRender(); // Re-render para mostrar controles de cantidad
    
    // Animación del botón flotante
    const floatingBtn = document.getElementById('floating-quote-bag');
    if (floatingBtn) {
        floatingBtn.classList.add('pop-animation');
        setTimeout(() => {
            floatingBtn.classList.remove('pop-animation');
        }, 300);
    }
};

window.changeQty = function(productId, delta) {
    const itemIndex = quoteBag.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;

    quoteBag[itemIndex].quantity += delta;

    if (quoteBag[itemIndex].quantity <= 0) {
        quoteBag.splice(itemIndex, 1);
    }

    saveQuoteBag();
    updateBagUI();
    filterAndRender();
};

// ACTUALIZAR INTERFAZ DE LA BOLSA
function updateBagUI() {
    const badge = document.getElementById('bag-count');
    const subtitle = document.getElementById('bag-subtitle-text');
    const floatingBtn = document.getElementById('floating-quote-bag');
    const itemsContainer = document.getElementById('quote-items-container');
    const emptyMsg = document.getElementById('quote-empty-msg');
    const formSection = document.getElementById('quote-form-section');

    const totalCount = quoteBag.reduce((acc, curr) => acc + curr.quantity, 0);

    // Actualizar badge flotante
    if (badge) badge.textContent = totalCount;
    if (subtitle) {
        subtitle.textContent = `${totalCount} ${totalCount === 1 ? 'planta agregada' : 'plantas agregadas'}`;
    }

    // Mostrar u ocultar botón flotante según si tiene items
    if (floatingBtn) {
        if (totalCount > 0) {
            floatingBtn.classList.add('visible');
        } else {
            floatingBtn.classList.remove('visible');
        }
    }

    // Actualizar listado en el modal
    if (itemsContainer) {
        if (quoteBag.length === 0) {
            itemsContainer.innerHTML = '';
            if (emptyMsg) emptyMsg.style.display = 'flex';
            if (formSection) formSection.style.display = 'none';
        } else {
            if (emptyMsg) emptyMsg.style.display = 'none';
            if (formSection) formSection.style.display = 'block';

            itemsContainer.innerHTML = quoteBag.map(item => `
                <div class="quote-item">
                    <div class="quote-item-details">
                        <h4>${item.name}</h4>
                        <span>${item.scientific}</span>
                    </div>
                    <div class="quote-item-controls">
                        <div class="quantity-controller">
                            <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
                            <span class="qty-number">${item.quantity}</span>
                            <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
                        </div>
                        <button class="remove-item-btn" onclick="changeQty('${item.id}', -${item.quantity})" title="Quitar">🗑️</button>
                    </div>
                </div>
            `).join('');
        }
    }
}

// INICIALIZACIÓN DEL MODAL
function initModal() {
    const modal = document.getElementById('quote-modal');
    const floatingBtn = document.getElementById('floating-quote-bag');
    const closeBtn = document.getElementById('close-quote-modal');
    const clearBtn = document.getElementById('clear-quote-bag');
    const sendBtn = document.getElementById('send-quote-whatsapp');

    if (!modal) return;

    // Abrir
    if (floatingBtn) {
        floatingBtn.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Detiene scroll del body
        });
    }

    // Cerrar
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    // Cerrar al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Vaciar
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres vaciar tu bolsa de cotización?')) {
                quoteBag = [];
                saveQuoteBag();
                updateBagUI();
                filterAndRender();
                closeModal();
            }
        });
    }

    // Enviar WhatsApp
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const nameInput = document.getElementById('quote-name');
            const noteInput = document.getElementById('quote-note');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const note = noteInput ? noteInput.value.trim() : '';

            if (!name) {
                alert('Por favor ingresa tu nombre para procesar la cotización.');
                if (nameInput) nameInput.focus();
                return;
            }

            // Construir mensaje estructurado
            let message = `🌿 *SOLICITUD DE COTIZACIÓN - VIDA FORESTAL*\n\n`;
            message += `👤 *Cliente:* ${name}\n`;
            if (note) {
                message += `📝 *Notas:* ${note}\n`;
            }
            message += `----------------------------------------------\n`;
            message += `🌱 *Detalle de plantas solicitadas:*\n\n`;

            quoteBag.forEach(item => {
                message += `• *${item.quantity}x* ${item.name} (${item.scientific})\n`;
            });

            message += `\n----------------------------------------------\n`;
            message += `¡Muchas gracias! Espero su respuesta sobre stock y costo de envío.`;

            // Enviar por WhatsApp
            const whatsappNumber = '5491126958481';
            const encoded = encodeURIComponent(message);
            const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;
            
            window.open(url, '_blank');
        });
    }
}

// INICIALIZACIÓN GENERAL DE LA PÁGINA
function initServiciosPage() {
    console.log('🌱 Inicializando página de Servicios...');
    
    // Cargar datos persistidos
    loadQuoteBag();
    
    // Inicializar sub-módulos
    initCatalog();
    initModal();
    updateBagUI();
    
    // Iniciar AOS si existe
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            disable: window.innerWidth < 768
        });
    }

    // Control de video de fondo
    const videos = document.querySelectorAll('.hero-servicios video');
    videos.forEach(video => {
        try {
            video.playbackRate = 0.8;
            video.play().catch(err => console.log('Autoplay bloqueado:', err));
        } catch (e) {
            console.error('Error al controlar video:', e);
        }
    });

    // Menú móvil (enlace manual con common.js si es necesario)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('nav ul.menu');
    if (mobileMenuBtn && menu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            menu.classList.toggle('active');
            this.innerHTML = menu.classList.contains('active') ? '✕' : '☰';
        });
    }
}

document.addEventListener('DOMContentLoaded', initServiciosPage);