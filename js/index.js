function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            disable: window.innerWidth < 768
        });
    }
}

function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    if (counters.length === 0) return;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '50px'
        });
        
        observer.observe(counter);
    });
}

function initHeroTypewriter() {
    const heroText = document.querySelector('.hero-index .hero-content p');
    if (!heroText) return;
    
    const originalText = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    let isAnimating = false;
    
    function typeWriter() {
        if (i < originalText.length) {
            isAnimating = true;
            heroText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        } else {
            isAnimating = false;
        }
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isAnimating && heroText.textContent === '') {
                setTimeout(typeWriter, 500);
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(heroText);
}

function initEnhancedHover() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.borderColor = 'var(--color-primary)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = 'var(--header-border)';
        });
    });
}

function initVideoControl() {
    const videos = document.querySelectorAll('.hero-index video');
    
    videos.forEach(video => {
        try {
            video.playbackRate = 0.7;
            
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Auto-play bloqueado, reproducción manual requerida:", error);
                });
            }
        } catch (error) {
            console.error("Error con el video:", error);
        }
    });
}

function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-element');
    if (floatingElements.length === 0) return;
    
    floatingElements.forEach((element, index) => {
        const duration = 8 + (index * 2);
        const delay = index * 0.5;
        
        element.style.animation = `
            floatRandom ${duration}s ease-in-out ${delay}s infinite
        `;
    });
}

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
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

function initIndexSpecific() {
    console.log("🏡 Index - Inicializando funciones específicas...");
    
    initAOS();
    
    initStatsCounter();
    
    initEnhancedHover();
    
    initFloatingElements();
    
    initScrollIndicator();
    
    initVideoControl();
    
    initHeroTypewriter();
    
    console.log("✅ Index - Funciones específicas inicializadas");
}

document.addEventListener('DOMContentLoaded', initIndexSpecific);

window.addEventListener('load', function() {
    console.log("📄 Index - Página completamente cargada");
    
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 500);
    }
});

// (para módulos futuros)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initStatsCounter,
        initEnhancedHover,
        initVideoControl
    };
}