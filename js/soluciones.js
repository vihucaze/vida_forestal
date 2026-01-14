function initSolucionesAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            disable: window.innerWidth < 768,
            startEvent: 'DOMContentLoaded'
        });
    }
}

function createParticles() {
    const hero = document.querySelector('.hero-soluciones');
    if (!hero) {
        console.log("⚠️ No se encontró .hero-soluciones");
        return;
    }
    
    if (document.querySelector('.particles-container')) {
        console.log("✅ Partículas ya existen");
        return;
    }
    
    console.log("✨ Creando partículas para soluciones...");
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    hero.appendChild(particlesContainer);

    const particleCount = window.innerWidth < 768 ? 15 : 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = 1 + Math.random() * 3;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 3 + Math.random() * 4;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, #2ecc71, #1abc9c);
            border-radius: 50%;
            opacity: ${0.1 + Math.random() * 0.2};
            left: ${left}%;
            top: ${top}%;
            animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
            filter: blur(${Math.random() * 1}px);
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    console.log(`✅ ${particleCount} partículas creadas`);
}

function initTypeWriterEffect() {
    const elements = document.querySelectorAll('.servicio-content h3');
    
    if (elements.length === 0) {
        console.log("ℹ️ No se encontraron títulos para efecto máquina de escribir");
        return;
    }
    
    console.log(`🔤 Configurando efecto escritura para ${elements.length} títulos`);
    
    elements.forEach((element, index) => {
        const originalText = element.textContent;
        element.setAttribute('data-original-text', originalText);
        element.textContent = '';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    element.textContent = '';
                    let i = 0;
                    
                    function type() {
                        if (i < originalText.length) {
                            element.textContent += originalText.charAt(i);
                            i++;
                            setTimeout(type, 30 + Math.random() * 20);
                        }
                    }
                    
                    setTimeout(type, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '100px'
        });
        
        observer.observe(element);
    });
}

function initSolucionesCardHover() {
    const serviceCards = document.querySelectorAll('.servicio-card');
    
    serviceCards.forEach((card, index) => {
        card.setAttribute('data-card-index', index);
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(46, 204, 113, 0.15)';
            this.style.borderColor = 'var(--color-primary)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
            this.style.borderColor = 'var(--header-border)';
        });
    });
    
    const techItems = document.querySelectorAll('.tecnologia-item');
    
    techItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(46, 204, 113, 0.1)';
            this.style.borderColor = 'var(--color-primary)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
            this.style.borderColor = 'var(--header-border)';
        });
    });
}

function initIframeLoading() {
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
        iframe.setAttribute('loading', 'lazy');
        
        iframe.addEventListener('load', function() {
            this.classList.add('loaded');
            console.log(`✅ Iframe cargado: ${this.src.substring(0, 50)}...`);
        });
        
        iframe.addEventListener('error', function() {
            console.error(`❌ Error cargando iframe: ${this.src}`);
            this.classList.add('error');
            
            const errorMsg = document.createElement('div');
            errorMsg.textContent = 'No se pudo cargar el contenido externo';
            errorMsg.style.cssText = `
                padding: 20px;
                text-align: center;
                color: #666;
                font-style: italic;
            `;
            
            this.parentNode.appendChild(errorMsg);
        });
    });
}

function initSolucionesContactForm() {
    const contactButton = document.querySelector('.cta-soluciones .btn-primary');
    
    if (contactButton) {
        contactButton.addEventListener('click', function(e) {
            if (this.href && this.href.includes('Contacto.html')) {
                console.log("🔗 Redirigiendo a página de contacto");
                return;
            }
            
            e.preventDefault();
            window.location.href = 'Contacto.html?source=soluciones';
        });
    }
}

function initVisualEffects() {
    const shapes = document.querySelectorAll('.shape');
    
    if (shapes.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            shapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = -(scrolled * speed);
                shape.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    const serviceIcons = document.querySelectorAll('.servicio-icon i');
    
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 8px rgba(46, 204, 113, 0.5))';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    });
}

function initSolucionesScrollIndicator() {
    const scrollIndicator = document.querySelector('.hero-soluciones .scroll-indicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.visibility = 'visible';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
    
    scrollIndicator.addEventListener('click', function() {
        const firstSection = document.querySelector('.servicios-section');
        if (firstSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = firstSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

function addDynamicStyles() {
    if (document.querySelector('#soluciones-dynamic-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'soluciones-dynamic-styles';
    
    style.textContent = `
        /* Animación para partículas */
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0.2;
            }
            25% {
                transform: translateY(-20px) translateX(10px) rotate(5deg);
                opacity: 0.5;
            }
            50% {
                transform: translateY(-40px) translateX(-5px) rotate(-5deg);
                opacity: 0.7;
            }
            75% {
                transform: translateY(-20px) translateX(-10px) rotate(3deg);
                opacity: 0.5;
            }
        }
        
        /* Transiciones suaves */
        .servicio-card, .tecnologia-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* Estados de carga para iframes */
        iframe.loaded {
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        iframe:not(.loaded) {
            opacity: 0;
        }
        
        /* Efecto pulso para iconos */
        @keyframes iconPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        .servicio-icon:hover i {
            animation: iconPulse 0.5s ease;
        }
    `;
    
    document.head.appendChild(style);
    console.log("🎨 Estilos dinámicos agregados para soluciones");
}

function initSolucionesSpecific() {
    console.log("💻 Soluciones - Inicializando funciones específicas...");
    
    addDynamicStyles();
    
    initSolucionesAOS();
    
    createParticles();
    
    initTypeWriterEffect();
    
    initSolucionesCardHover();
    
    initIframeLoading();
    
    initSolucionesContactForm();
    
    initVisualEffects();
    
    initSolucionesScrollIndicator();
    
    console.log("✅ Soluciones - Funciones específicas inicializadas");
}

function handleSolucionesErrors() {
    const iframes = document.querySelectorAll('iframe');
    if (iframes.length === 0) {
        console.warn("⚠️ No se encontraron iframes en soluciones.html");
    }
    
    const requiredSections = ['servicios', 'tecnologias', 'datos-tiempo-real'];
    requiredSections.forEach(sectionId => {
        if (!document.getElementById(sectionId)) {
            console.warn(`⚠️ Sección #${sectionId} no encontrada`);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initSolucionesSpecific();
    
    handleSolucionesErrors();
});

window.addEventListener('load', function() {
    console.log("📄 Soluciones - Página completamente cargada");
    
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
            console.log("🔄 AOS refrescado");
        }, 800);
    }
    
    if (!document.querySelector('.particle')) {
        setTimeout(createParticles, 1000);
    }
});

window.addEventListener('resize', function() {
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
        const currentWidth = window.innerWidth;
        const particleCount = particlesContainer.querySelectorAll('.particle').length;
        const expectedCount = currentWidth < 768 ? 15 : 25;
        
        if (Math.abs(particleCount - expectedCount) > 5) {
            particlesContainer.remove();
            createParticles();
        }
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createParticles,
        initTypeWriterEffect,
        initSolucionesCardHover
    };
}