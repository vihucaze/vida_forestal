function initEmailJS() {
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS no está cargado');
        this.showEmailJSError();
        return false;
    }
    
    if (window.APP_CONFIG && window.APP_CONFIG.EMAILJS_PUBLIC_KEY) {
        try {
            emailjs.init(window.APP_CONFIG.EMAILJS_PUBLIC_KEY);
            console.log("✅ EmailJS inicializado con config.js");
            return true;
        } catch (error) {
            console.error('❌ Error inicializando EmailJS con config:', error);
            return this.initEmailJSFallback();
        }
    } 
    else {
        return this.initEmailJSFallback();
    }
}

function initEmailJSFallback() {
    console.error('❌ EmailJS: Configuración faltante - Verifica config.js');
    this.showEmailJSError();
    return false;
}

function showEmailJSError() {
    const formHeader = document.querySelector('.form-header');
    if (formHeader) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'emailjs-error';
        errorDiv.innerHTML = `
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px 15px; 
                        border-radius: 5px; margin-top: 10px; color: #856404;">
                ⚠️ <strong>Sistema temporalmente no disponible</strong><br>
                Por favor, contáctanos directamente por WhatsApp o email.
            </div>
        `;
        formHeader.appendChild(errorDiv);
    }
}

function initContactoAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            disable: window.innerWidth < 768
        });
    }
}

class ContactForm {
    constructor() {
        this.form = document.getElementById('formulario-contacto');
        this.successMessage = document.getElementById('mensaje-exito');
        this.submitBtn = document.querySelector('.btn-submit');
        this.isSubmitting = false;
        this.emailjsReady = false;
        
        if (this.form) {
            this.initializeForm();
        } else {
            console.error("❌ Formulario de contacto no encontrado");
        }
    }

    initializeForm() {
        console.log("📝 Inicializando formulario de contacto...");
        
        this.emailjsReady = typeof emailjs !== 'undefined' && emailjs.init;
        
        if (!this.emailjsReady) {
            this.disableForm('EmailJS no disponible');
            return;
        }
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        this.setupRealTimeValidation();
        
        const newConsultaBtn = document.getElementById('nueva-consulta');
        if (newConsultaBtn) {
            newConsultaBtn.addEventListener('click', () => this.resetForm());
        }
        
        this.setupFAQ();
        
        this.prefillFromURL();
        
        console.log("✅ Formulario inicializado");
    }
    
    disableForm(reason) {
        console.warn(`⚠️ Formulario deshabilitado: ${reason}`);
        if (this.submitBtn) {
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = '<span class="btn-text">Sistema no disponible</span>';
            this.submitBtn.style.opacity = '0.6';
            this.submitBtn.style.cursor = 'not-allowed';
        }
        
        const inputs = this.form.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => {
            input.disabled = true;
        });
    }

    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.clearError(input);
                }
            });
            
            if (input.hasAttribute('required') && 
                (input.type === 'email' || input.name === 'telefono')) {
                input.addEventListener('input', () => {
                    if (input.value.trim().length > 3) {
                        this.validateField(input);
                    }
                });
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        this.clearError(field);
        switch(fieldName) {
            case 'nombre':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'El nombre debe tener al menos 2 caracteres';
                } else if (value.length > 100) {
                    isValid = false;
                    errorMessage = 'El nombre es demasiado largo';
                }
                break;

            case 'email':
                if (!this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Ingresa un email válido (ej: usuario@dominio.com)';
                }
                break;

            case 'telefono':
                if (!this.isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Ingresa un teléfono válido (ej: +54 11 1234-5678)';
                }
                break;

            case 'servicio':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Por favor, selecciona un servicio';
                }
                break;

            case 'proyecto':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'La descripción debe tener al menos 10 caracteres';
                } else if (value.length > 2000) {
                    isValid = false;
                    errorMessage = 'La descripción es demasiado larga (máx. 2000 caracteres)';
                }
                break;
                
            case 'empresa':
                if (value.length > 150) {
                    isValid = false;
                    errorMessage = 'El nombre de la empresa es demasiado largo';
                }
                break;
        }

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }

        if (!isValid) {
            this.showError(field, errorMessage);
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const cleanedPhone = phone.replace(/\s/g, '');
        const phoneRegex = /^[\d\-\+\(\)]{8,20}$/;
        return phoneRegex.test(cleanedPhone);
    }

    showError(field, message) {
        field.classList.add('error');
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.color = '#e74c3c';
            errorElement.style.fontSize = '0.85rem';
        }
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    validateForm() {
        const fields = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        let firstErrorField = null;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
                if (!firstErrorField) {
                    firstErrorField = field;
                }
            }
        });

        if (firstErrorField) {
            firstErrorField.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            firstErrorField.focus();
        }

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.emailjsReady) {
            this.showNotification('El sistema de envío no está disponible. Por favor, contáctanos por WhatsApp.', 'error');
            return;
        }
        
        if (this.isSubmitting) {
            this.showNotification('Por favor, espera...', 'info');
            return;
        }
        
        if (!this.validateForm()) {
            this.showNotification('Por favor, corrige los errores en el formulario', 'error');
            return;
        }

        this.setLoadingState(true);
        this.isSubmitting = true;

        try {
            const formData = this.getFormData();
            
            await this.sendFormData(formData);
            
            this.showSuccess();
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contacto',
                    'event_label': 'Formulario de contacto enviado',
                    'service': formData.servicio
                });
            }
            
        } catch (error) {
            console.error('❌ Error enviando formulario:', error);
            this.showNotification(
                `Error al enviar: ${error.message || 'Por favor, intenta nuevamente'}`,
                'error'
            );
        } finally {
            this.setLoadingState(false);
            this.isSubmitting = false;
        }
    }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        data.timestamp = new Date().toISOString();
        data.page_url = window.location.href;
        data.referrer = document.referrer || 'direct';
        data.user_agent = navigator.userAgent.substring(0, 200);
        
        return data;
    }

    async sendFormData(formData) {
        console.log('📤 Enviando datos del formulario...', formData);
        
        if (!window.APP_CONFIG || !window.APP_CONFIG.EMAILJS_SERVICE_ID) {
            throw new Error('Configuración de EmailJS no encontrada');
        }
        
        const emailjsConfig = {
            serviceId: window.APP_CONFIG.EMAILJS_SERVICE_ID,
            templateId: window.APP_CONFIG.EMAILJS_TEMPLATE_ID,
            publicKey: window.APP_CONFIG.EMAILJS_PUBLIC_KEY
        };
        
        console.log('🔧 Configuración EmailJS:', emailjsConfig);

        try {
            const result = await emailjs.send(
                emailjsConfig.serviceId,
                emailjsConfig.templateId,
                {
                    from_name: formData.nombre,
                    from_email: formData.email,
                    empresa: formData.empresa || 'No especificada',
                    telefono: formData.telefono,
                    servicio: this.getServiceName(formData.servicio),
                    proyecto: formData.proyecto,
                    newsletter: formData.newsletter ? 'Sí' : 'No',
                    timestamp: new Date().toLocaleString('es-AR'),
                    page_source: formData.page_url.includes('?') ? 
                        new URL(formData.page_url).searchParams.get('source') || 'contacto' : 
                        'contacto'
                },
                emailjsConfig.publicKey
            );

            console.log('✅ Email enviado exitosamente:', result);
            return result;

        } catch (error) {
            console.error('❌ Error EmailJS:', error);
            
            let errorMsg = 'Error del servicio de email';
            if (error.text) {
                errorMsg += `: ${error.text}`;
            } else if (error.message) {
                errorMsg += `: ${error.message}`;
            }
            
            throw new Error(errorMsg);
        }
    }
    
    getServiceName(serviceKey) {
        const services = {
            'vivero': '🌿 Vivero y Plantas',
            'agroquimicos': '🧪 Agroquímicos',
            'poda': '✂️ Poda y Paisajismo',
            'consultoria': '📊 Consultoría Forestal',
            'agricultura': '🚜 Agricultura de Precisión',
            'topografia': '📐 Topografía y Geomática',
            'estudio-ambiental': '🌍 Estudio de Impacto Ambiental',
            'otro': '⚡ Otro servicio'
        };
        
        return services[serviceKey] || serviceKey;
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
            this.submitBtn.setAttribute('aria-busy', 'true');
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
            this.submitBtn.setAttribute('aria-busy', 'false');
        }
    }

    showSuccess() {
        this.form.style.display = 'none';
        
        this.successMessage.style.display = 'block';
        this.successMessage.style.animation = 'fadeIn 0.5s ease';
        
        this.successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        this.form.reset();
        
        this.showNotification('¡Consulta enviada con éxito!', 'success');
        
        console.log('🎉 Formulario enviado exitosamente');
    }

    resetForm() {
        this.form.style.display = 'block';
        this.form.style.animation = 'fadeIn 0.3s ease';
        
        this.successMessage.style.display = 'none';
        
        this.form.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        this.form.querySelectorAll('.error').forEach(field => {
            this.clearError(field);
        });
        
        console.log('🔄 Formulario reiniciado para nueva consulta');
    }

    showNotification(message, type = 'info') {
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        const icons = {
            'success': '✅',
            'error': '❌',
            'info': 'ℹ️',
            'warning': '⚠️'
        };
        
        notification.innerHTML = `
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span class="notification-text">${message}</span>
            <button class="notification-close" aria-label="Cerrar notificación">&times;</button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2ecc71' : 
                        type === 'error' ? '#e74c3c' : 
                        type === 'warning' ? '#f39c12' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
            font-family: inherit;
        `;
        
        document.body.appendChild(notification);
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });

        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length === 0) {
            console.log("ℹ️ No se encontraron items FAQ");
            return;
        }
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const toggle = item.querySelector('.faq-toggle');
            
            if (question && toggle) {
                question.addEventListener('click', () => {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    item.classList.toggle('active');
                    
                    if (item.classList.contains('active')) {
                        toggle.textContent = '−';
                        toggle.style.transform = 'rotate(180deg)';
                    } else {
                        toggle.textContent = '+';
                        toggle.style.transform = 'rotate(0deg)';
                    }
                });
                
                question.setAttribute('tabindex', '0');
                question.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        question.click();
                    }
                });
            }
        });
        
        console.log(`✅ ${faqItems.length} items FAQ configurados`);
    }

    prefillFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        
        const servicioParam = urlParams.get('service') || urlParams.get('servicio');
        if (servicioParam) {
            const servicioSelect = document.getElementById('servicio');
            if (servicioSelect) {
                servicioSelect.value = servicioParam;
                console.log(`🔧 Servicio predefinido desde URL: ${servicioParam}`);
            }
        }
        
        const productoParam = urlParams.get('product') || urlParams.get('producto');
        if (productoParam) {
            const proyectoTextarea = document.getElementById('proyecto');
            if (proyectoTextarea) {
                const prefilledText = `Consulta sobre: ${productoParam}\n\n`;
                proyectoTextarea.value = prefilledText + (proyectoTextarea.value || '');
                console.log(`📦 Producto predefinido desde URL: ${productoParam}`);
            }
        }
        
        const sourceParam = urlParams.get('source');
        if (sourceParam) {
            console.log(`📍 Origen del contacto: ${sourceParam}`);
        }
    }
}

function initMapInteractivity() {
    const mapLinks = document.querySelectorAll('[href*="maps.google.com"], [href*="google.com/maps"]');
    
    mapLinks.forEach(link => {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        if (!link.querySelector('img, .icon')) {
            link.innerHTML = '🗺️ ' + link.innerHTML;
        }
    });
    
    const mapIframe = document.querySelector('.mapa-embed iframe');
    if (mapIframe) {
        mapIframe.setAttribute('loading', 'lazy');
        mapIframe.setAttribute('importance', 'low');
    }
}

function initQuickWhatsAppLinks() {
    const quickLinks = document.querySelectorAll('.servicio-rapido');
    
    quickLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href && this.href.includes('wa.me')) {
                return;
            }
            
            e.preventDefault();
            const serviceType = this.querySelector('.servicio-text').textContent;
            const message = `Hola! Estoy interesado en: ${serviceType}`;
            
            if (window.CommonUtils && window.CommonUtils.openWhatsApp) {
                window.CommonUtils.openWhatsApp(message);
            } else {
                const whatsappNumber = window.APP_CONFIG?.WHATSAPP_NUMBER || '5491126958481';
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
            }
        });
    });
}

function initContactoScrollIndicator() {
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat-number');
                stats.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.opacity = '1';
                        stat.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(heroStats);
}

function addContactoStyles() {
    if (document.querySelector('#contacto-dynamic-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'contacto-dynamic-styles';
    
    style.textContent = `
        /* Animaciones para contacto */
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Estados del formulario */
        .form-group.error input,
        .form-group.error select,
        .form-group.error textarea {
            border-color: #e74c3c !important;
            background-color: rgba(231, 76, 60, 0.05);
        }
        
        /* FAQ animations */
        .faq-item .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .faq-item.active .faq-answer {
            max-height: 500px;
        }
        
        .faq-toggle {
            transition: transform 0.3s ease;
        }
        
        /* Hero stats animation */
        .stat-number {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        /* Botones de WhatsApp */
        .servicio-rapido {
            transition: all 0.2s ease;
        }
        
        .servicio-rapido:active {
            transform: scale(0.95);
        }
    `;
    
    document.head.appendChild(style);
}

function initContactoSpecific() {
    console.log("📞 Contacto - Inicializando funciones específicas...");
    
    addContactoStyles();
    
    initContactoAOS();
    
    const emailjsReady = initEmailJS();
    
    if (emailjsReady) {
        window.contactForm = new ContactForm();
    } else {
        console.error('❌ No se pudo inicializar EmailJS - Formulario deshabilitado');
    }
    
    initMapInteractivity();
    
    initQuickWhatsAppLinks();
    
    initContactoScrollIndicator();
    
    console.log("✅ Contacto - Funciones específicas inicializadas");
}

document.addEventListener('DOMContentLoaded', initContactoSpecific);

window.addEventListener('load', function() {
    console.log("📄 Contacto - Página completamente cargada");
    
    if (typeof AOS !== 'undefined') {
        setTimeout(() => AOS.refresh(), 500);
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ContactForm,
        initContactoSpecific
    };
}