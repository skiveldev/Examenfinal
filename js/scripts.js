// ===== JAVASCRIPT PRINCIPAL - FACULTAD DE CIENCIAS SOCIALES =====

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INICIALIZACIÓN =====
    initializeWebsite();
    
    // ===== FUNCIONES PRINCIPALES =====
    
    function initializeWebsite() {
        // Inicializar componentes
        initializeAnimations();
        initializeStatistics();
        initializeFormValidation();
        initializeAccessibility();
        initializeNavigation();
        initializeContactForm();
        
        console.log('✅ Sitio web de la Facultad de Ciencias Sociales inicializado correctamente');
    }
    
    // ===== ANIMACIONES Y EFECTOS =====
    
    function initializeAnimations() {
        // Animación de contador de estadísticas
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => observer.observe(stat));
        
        // Animación de cards al hacer scroll
        const cards = document.querySelectorAll('.card');
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => cardObserver.observe(card));
    }
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    // ===== VALIDACIÓN DE FORMULARIOS =====
    
    function initializeFormValidation() {
        const forms = document.querySelectorAll('.needs-validation');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                if (form.checkValidity()) {
                    handleFormSubmission(form);
                } else {
                    showValidationErrors(form);
                }
                
                form.classList.add('was-validated');
            });
            
            // Validación en tiempo real
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => clearFieldError(input));
            });
        });
    }
    
    function validateField(field) {
        const isValid = field.checkValidity();
        const feedback = field.parentNode.querySelector('.invalid-feedback');
        
        if (!isValid) {
            field.classList.add('is-invalid');
            if (feedback) {
                feedback.style.display = 'block';
            }
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            if (feedback) {
                feedback.style.display = 'none';
            }
        }
        
        return isValid;
    }
    
    function clearFieldError(field) {
        field.classList.remove('is-invalid', 'is-valid');
        const feedback = field.parentNode.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.style.display = 'none';
        }
    }
    
    function showValidationErrors(form) {
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) {
            firstInvalid.focus();
            showNotification('Por favor, completa todos los campos requeridos correctamente.', 'warning');
        }
    }
    
    // ===== MANEJO DE FORMULARIOS =====
    
    function initializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (this.checkValidity()) {
                    const submitBtn = this.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    
                    // Mostrar estado de carga
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
                    submitBtn.disabled = true;
                    
                    // Simular envío (en producción, aquí iría la lógica real)
                    setTimeout(() => {
                        showNotification('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.', 'success');
                        
                        // Restaurar botón
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        
                        // Limpiar formulario
                        this.reset();
                        this.classList.remove('was-validated');
                        
                        // Remover clases de validación
                        const inputs = this.querySelectorAll('.form-control, .form-select');
                        inputs.forEach(input => {
                            input.classList.remove('is-valid', 'is-invalid');
                        });
                        
                    }, 2000);
                }
            });
        }
    }
    
    function handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('Datos del formulario:', data);
        
        // Aquí se enviarían los datos al servidor
        // Por ahora, solo simulamos el envío
        showNotification('Formulario enviado correctamente', 'success');
    }
    
    // ===== ACCESIBILIDAD =====
    
    function initializeAccessibility() {
        // Manejo de teclado para navegación
        document.addEventListener('keydown', function(e) {
            // Escape para cerrar modales
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.modal.show');
                modals.forEach(modal => {
                    const modalInstance = bootstrap.Modal.getInstance(modal);
                    if (modalInstance) {
                        modalInstance.hide();
                    }
                });
            }
            
            // Enter para activar botones con focus
            if (e.key === 'Enter') {
                const focusedElement = document.activeElement;
                if (focusedElement && focusedElement.tagName === 'BUTTON') {
                    focusedElement.click();
                }
            }
        });
        
        // Mejorar navegación por teclado
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
        interactiveElements.forEach(element => {
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Anuncios para lectores de pantalla
        const announcements = document.createElement('div');
        announcements.setAttribute('aria-live', 'polite');
        announcements.setAttribute('aria-atomic', 'true');
        announcements.className = 'sr-only';
        document.body.appendChild(announcements);
        
        window.announceToScreenReader = function(message) {
            announcements.textContent = message;
            setTimeout(() => {
                announcements.textContent = '';
            }, 1000);
        };
    }
    
    // ===== NAVEGACIÓN =====
    
    function initializeNavigation() {
        // Navegación suave para enlaces internos
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 76; // Compensar navbar fijo
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Anunciar a lectores de pantalla
                    if (window.announceToScreenReader) {
                        window.announceToScreenReader(`Navegando a ${targetElement.textContent}`);
                    }
                }
            });
        });
        
        // Navbar responsive
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                
                if (window.announceToScreenReader) {
                    const message = isExpanded ? 'Menú de navegación cerrado' : 'Menú de navegación abierto';
                    window.announceToScreenReader(message);
                }
            });
        }
        
        // Cerrar menú móvil al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }
    
    // ===== NOTIFICACIONES =====
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Anunciar a lectores de pantalla
        if (window.announceToScreenReader) {
            window.announceToScreenReader(message);
        }
        
        // Remover automáticamente después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Remover al hacer clic en cerrar
        const closeBtn = notification.querySelector('.btn-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }
    
    // ===== ESTADÍSTICAS =====
    
    function initializeStatistics() {
        // Las estadísticas se animan automáticamente cuando entran en el viewport
        // gracias a la función initializeAnimations()
    }
    
    // ===== UTILIDADES =====
    
    // Función para detectar si el usuario prefiere movimiento reducido
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    // Función para detectar si el usuario prefiere alto contraste
    function prefersHighContrast() {
        return window.matchMedia('(prefers-contrast: high)').matches;
    }
    
    // Función para obtener el tamaño de pantalla actual
    function getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width < 576) return 'xs';
        if (width < 768) return 'sm';
        if (width < 992) return 'md';
        if (width < 1200) return 'lg';
        return 'xl';
    }
    
    // ===== EVENTOS DE WINDOW =====
    
    // Manejar redimensionamiento de ventana
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const breakpoint = getCurrentBreakpoint();
            console.log(`Breakpoint actual: ${breakpoint}`);
        }, 250);
    });
    
    // Manejar scroll para efectos de parallax suave
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function handleScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image-container img');
        
        parallaxElements.forEach(element => {
            const speed = scrolled * 0.3;
            element.style.transform = `translateY(${speed}px)`;
        });
    }
    
    // ===== FUNCIONES GLOBALES =====
    
    // Función global para mostrar notificaciones
    window.showNotification = showNotification;
    
    // Función global para validar formularios
    window.validateForm = function(formId) {
        const form = document.getElementById(formId);
        if (form) {
            return form.checkValidity();
        }
        return false;
    };
    
    // Función global para limpiar formularios
    window.clearForm = function(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
            form.classList.remove('was-validated');
            const inputs = form.querySelectorAll('.form-control, .form-select');
            inputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
        }
    };
    
    // ===== INICIALIZACIÓN DE COMPONENTES BOOTSTRAP =====
    
    // Inicializar tooltips si existen
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Inicializar popovers si existen
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // ===== LOGS DE DESARROLLO =====
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🔧 Modo desarrollo activo');
        console.log('📱 Breakpoint actual:', getCurrentBreakpoint());
        console.log('🎨 Preferencias de usuario:');
        console.log('  - Movimiento reducido:', prefersReducedMotion());
        console.log('  - Alto contraste:', prefersHighContrast());
    }
});

// ===== FUNCIONES PARA USO GLOBAL =====

// Función para abrir modal de programa académico
function openProgramModal(programId) {
    const modal = new bootstrap.Modal(document.getElementById(programId + 'Modal'));
    modal.show();
}

// Función para copiar información de contacto
function copyContactInfo(type) {
    let text = '';
    let message = '';
    
    switch(type) {
        case 'phone':
            text = '+1 (234) 567-890';
            message = 'Número de teléfono copiado al portapapeles';
            break;
        case 'email':
            text = 'info@fcs.edu';
            message = 'Correo electrónico copiado al portapapeles';
            break;
        case 'address':
            text = 'Av. Universidad 123, Ciudad Universitaria, Código Postal 12345, Ciudad, País';
            message = 'Dirección copiada al portapapeles';
            break;
    }
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            if (window.showNotification) {
                window.showNotification(message, 'success');
            }
        });
    } else {
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (window.showNotification) {
            window.showNotification(message, 'success');
        }
    }
} 