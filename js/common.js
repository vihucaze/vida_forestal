console.log("🌿 Vida Forestal - Cargando funciones comunes...");

window.COMMON_CONFIG = {
    WHATSAPP_NUMBER: '5491126958481',
    WHATSAPP_MESSAGES: {
        CONSULTA_VIVERO: 'Hola! Estoy interesado en plantas del vivero',
        COTIZAR_AGROQUIMICOS: 'Hola! Necesito cotización de agroquímicos',
        SERVICIOS_PROFESIONALES: 'Hola! Quiero información sobre servicios profesionales',
        ASESORAMIENTO_TECNICO: 'Hola! Busco asesoramiento técnico'
    }
};

let lastScroll = 0;
const header = document.querySelector("header");

function initHeaderScroll() {
    if (!header) return;
    
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.top = "-100px";
        } else {
            header.style.top = "0";
        }

        if (currentScroll > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        lastScroll = currentScroll;
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const menu = document.querySelector("nav ul.menu");
    
    if (!mobileMenuBtn || !menu) return;
    
    mobileMenuBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        menu.classList.toggle("active");
        this.innerHTML = menu.classList.contains("active") ? "✕" : "☰";
        this.setAttribute('aria-expanded', menu.classList.contains("active"));
    });

    document.querySelectorAll("nav ul.menu a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            mobileMenuBtn.innerHTML = "☰";
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener("click", function(e) {
        if (!menu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            menu.classList.remove("active");
            mobileMenuBtn.innerHTML = "☰";
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    menu.addEventListener("click", function(e) {
        e.stopPropagation();
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '' && href.startsWith('#') && 
                !href.includes('.html') && !href.includes('.htm')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('#current-year');
    
    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });
}

function initWhatsAppButtons() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]');
    
    whatsappLinks.forEach(link => {
        if (!link.target) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });
}

function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.host + '"])');
    
    externalLinks.forEach(link => {
        if (!link.target) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos], .scroll-animate');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach(element => observer.observe(element));
}

function initCommonFunctions() {
    console.log("🚀 Inicializando funciones comunes...");
    
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    
    updateCopyrightYear();
    initWhatsAppButtons();
    initExternalLinks();
    
    initScrollAnimations();
    
    console.log("✅ Funciones comunes inicializadas");
}

window.addEventListener('error', function(e) {
    console.error('❌ Error en la aplicación:', e.error);
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommonFunctions);
} else {
    initCommonFunctions();
}

window.CommonUtils = {
    getWhatsAppURL: function(message = 'Hola! Necesito información') {
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;
    },
    openWhatsApp: function(message) {
        window.open(this.getWhatsAppURL(message), '_blank');
    },
    scrollToElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
};

console.log("🌿 Vida Forestal - Common.js cargado correctamente");