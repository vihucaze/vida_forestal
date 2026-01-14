function initServiciosAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            disable: window.innerWidth < 768
        });
    }
}

function initServiceNavigation() {
    const categoriaCards = document.querySelectorAll('.categoria-card');
    
    categoriaCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const targetSection = document.getElementById(category);
            
            if (targetSection) {
                if (window.CommonUtils && window.CommonUtils.scrollToElement) {
                    window.CommonUtils.scrollToElement(category);
                } else {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initProductButtons() {
    const productButtons = document.querySelectorAll('[data-action]');
    
    productButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const action = this.getAttribute('data-action');
            const productCard = this.closest('.producto-card');
            const productType = productCard ? productCard.getAttribute('data-product-type') : 'producto';
            
            handleProductAction(action, productType, this);
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function handleProductAction(action, productType, button) {
    const productNames = {
        'ornamentales': 'Plantas Ornamentales',
        'frutales': 'Árboles Frutales', 
        'nativas': 'Plantas Nativas'
    };
    
    const productName = productNames[productType] || 'Producto';
    
    switch(action) {
        case 'consultar':
            const consultMessage = `Hola! Estoy interesado en consultar el stock de: ${productName}`;
            openWhatsAppWithMessage(consultMessage);
            break;
            
        case 'cotizar':
            const cotizacionMessage = `Hola! Necesito una cotización para: ${productName}`;
            openWhatsAppWithMessage(cotizacionMessage);
            break;
    }
}

function initAgroCategories() {
    const categoryButtons = document.querySelectorAll('[data-category]');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const category = this.getAttribute('data-category');
            showCategoryProducts(category);
        });
    });
}

function showCategoryProducts(category) {
    const categoryNames = {
        'fungicidas': 'Fungicidas',
        'insecticidas': 'Insecticidas', 
        'herbicidas': 'Herbicidas'
    };
    
    const categoryName = categoryNames[category] || 'Productos';
    const message = `Hola! Me interesa conocer los productos de la categoría: ${categoryName}`;
    openWhatsAppWithMessage(message);
}

function initServiciosHoverEffects() {
    const categoriaCards = document.querySelectorAll('.categoria-card');
    categoriaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    const productoCards = document.querySelectorAll('.producto-card');
    productoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    const agroCards = document.querySelectorAll('.categoria-agro');
    agroCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
}

function initServiciosVideoControl() {
    const videos = document.querySelectorAll('.hero-servicios video');
    
    videos.forEach(video => {
        try {
            video.playbackRate = 0.8;

            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Auto-play bloqueado en servicios:", error);
                });
            }
        } catch (error) {
            console.error("Error con video en servicios:", error);
        }
    });
}

function initServiciosScrollIndicator() {
    const scrollIndicator = document.querySelector('.servicios .scroll-indicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.visibility = 'visible';
        }
    });
}

// SISTEMA DE INVENTARIO (PREPARADO PARA BD)
class ServiciosInventoryManager {
    constructor() {
        this.products = {
            'ornamentales': { 
                stock: 45, 
                category: 'vivero',
                lastUpdated: new Date().toISOString()
            },
            'frutales': { 
                stock: 28, 
                category: 'vivero',
                lastUpdated: new Date().toISOString()
            },
            'nativas': { 
                stock: 62, 
                category: 'vivero',
                lastUpdated: new Date().toISOString()
            }
        };
    }
    
    checkStock(productType) {
        return this.products[productType] ? this.products[productType].stock : 0;
    }
    
    getProductInfo(productType) {
        return this.products[productType] || null;
    }
    
    // Método placeholder para integración futura con API
    async syncWithDatabase() {
        console.log('🔄 Servicios - Preparado para sincronizar con BD...');
        // Aquí irá la lógica de conexión a API
        return new Promise(resolve => setTimeout(resolve, 100));
    }
}

function openWhatsAppWithMessage(message) {
    const whatsappNumber = '5491126958481';
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
}

function initServiciosSpecific() {
    console.log("🛠️ Servicios - Inicializando funciones específicas...");
    
    initServiciosAOS();
    
    initServiceNavigation();
    
    initProductButtons();
    
    initAgroCategories();
    
    initServiciosHoverEffects();
    
    initServiciosVideoControl();
    
    initServiciosScrollIndicator();
    
    window.serviciosInventory = new ServiciosInventoryManager();
    
    console.log("✅ Servicios - Funciones específicas inicializadas");
    
    setTimeout(() => {
        window.serviciosInventory.syncWithDatabase()
            .then(() => console.log("📊 Servicios - Inventario actualizado"))
            .catch(err => console.error("❌ Error actualizando inventario:", err));
    }, 2000);
}

function handleServiciosErrors() {
    const mainSections = ['vivero', 'agroquimicos', 'servicios-profesionales'];
    
    mainSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (!section) {
            console.warn(`⚠️ Sección ${sectionId} no encontrada en servicios.html`);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initServiciosSpecific();

    handleServiciosErrors();
});

window.addEventListener('load', function() {
    console.log("📄 Servicios - Página completamente cargada");
    
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 500);
    }
});

// (para módulos futuros)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ServiciosInventoryManager,
        initServiceNavigation,
        initProductButtons,
        initAgroCategories
    };
}