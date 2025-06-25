/**
 * BARBERSHOP BY HAUSAR - Optimierte Version
 * Performance-fokussiert mit wiederverwendbaren Komponenten
 */

class BarbershopOptimized {
    constructor() {
        // Initialisierung, sobald das Skript geladen wird
        this.init();
    }

    async init() {
        // Lade Header und Footer zuerst
        await this.loadSharedComponents();

        // Initialisiere den Rest der Funktionalität, NACHDEM Header/Footer geladen sind
        this.initNavigation(); // Hängt vom geladenen Header ab
        
        // NEU: Scroll-basiertes aktives Menü-Highlighting
        this.initActiveNavOnScroll();
        
        if ('IntersectionObserver' in window) {
            this.initLazyLoading();
            this.initScrollAnimations();
        }
        
        this.initAllGalleries(); 
        this.initOptimizedSlider();
        
        if (window.matchMedia('(max-width: 768px)').matches) {
            this.initMobileOptimizations();
        }
        
        this.initAccessibility();
    }
    
    // Funktion zum Laden von Header und Footer
    async loadSharedComponents() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        const fetchHeader = fetch('header.html').then(response => response.ok ? response.text() : '');
        const fetchFooter = fetch('footer.html').then(response => response.ok ? response.text() : '');

        try {
            const [headerHtml, footerHtml] = await Promise.all([fetchHeader, fetchFooter]);

            if (headerPlaceholder && headerHtml) {
                headerPlaceholder.innerHTML = headerHtml;
            }
            if (footerPlaceholder && footerHtml) {
                footerPlaceholder.innerHTML = footerHtml;
            }
        } catch (error) {
            console.error('Fehler beim Laden der Komponenten:', error);
        }
    }

    // Navigation mit reduzierten Abständen
    initNavigation() {
        const navbar = document.querySelector('.navbar-premium');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link, .btn-premium');

        navLinks.forEach(link => {
            const linkUrl = new URL(link.href, window.location.href);
            const currentUrl = new URL(window.location.href);
            
            if (linkUrl.pathname === currentUrl.pathname && link.hash) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.hash);
                    
                    if (target) {
                        if (navMenu && menuToggle && navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                            menuToggle.classList.remove('active');
                            menuToggle.setAttribute('aria-expanded', 'false');
                            document.body.style.overflow = '';
                        }
                        
                        const navHeight = navbar ? navbar.offsetHeight : 70;
                        const targetPosition = target.offsetTop - navHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                const isActive = navMenu.classList.contains('active');
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', String(!isActive));
                document.body.style.overflow = isActive ? '' : 'hidden';
            });
        }

        if (navbar) {
             let ticking = false;
             window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        if (window.scrollY > 100) {
                            navbar.classList.add('scrolled');
                        } else {
                            navbar.classList.remove('scrolled');
                        }
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        }
    }
    
    // KORREKTUR & NEUE FUNKTION: Hebt den aktuellen Menüpunkt beim Scrollen hervor
    initActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu .nav-link');

        if (!sections.length || !navLinks.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        // Überprüfe, ob der Link auf die Sektion verweist
                        if (link.getAttribute('href').endsWith('#' + entry.target.id)) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            // Die Sektion gilt als aktiv, wenn sie zu 50% sichtbar ist
            threshold: 0.5 
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }


    // Optimiertes Lazy Loading
    initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src], img.lazy');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.classList.add('loaded');
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Optimierter Slider mit Lazy Loading
    initOptimizedSlider() {
        const slider = document.querySelector('.snapshot-slider');
        if (!slider) return;
        
        const slides = slider.querySelectorAll('.slide');
        if (slides.length <= 1) return;

        let currentSlide = 0;
        
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            
            const nextSlide = slides[currentSlide];
            const img = nextSlide.querySelector('img[data-src]');
            if (img) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            
            nextSlide.classList.add('active');
        }, 5000);
    }

    // Kombinierte Initialisierung für alle Galerien
    initAllGalleries() {
        const clickableItems = document.querySelectorAll('.gallery-item, .video-item');
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.querySelector('.lightbox-close');

        if (!lightbox || !closeBtn || clickableItems.length === 0) return;

        this.galleryData = Array.from(clickableItems).map(item => {
            const type = item.dataset.type || 'image';
            if (type === 'video') {
                const video = item.querySelector('video source');
                const info = item.querySelector('.video-info');
                return {
                    type: 'video',
                    src: video ? video.src : '',
                    title: info?.querySelector('h4')?.textContent || '',
                    description: info?.querySelector('p')?.textContent || ''
                };
            } else { // 'image'
                const img = item.querySelector('img');
                const overlay = item.querySelector('.gallery-overlay, .snapshot-overlay');
                return {
                    type: 'image',
                    src: img.src || img.dataset.src,
                    alt: img.alt,
                    title: overlay?.querySelector('h4')?.textContent || '',
                    description: overlay?.querySelector('p')?.textContent || ''
                };
            }
        });
        
        clickableItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.currentIndex = index;
                this.openLightbox(this.currentIndex);
            });
            item.style.cursor = 'pointer';
        });

        this.lightbox = lightbox;
        this.lightboxImage = document.getElementById('lightbox-image');
        this.lightboxVideo = document.getElementById('lightbox-video');
        this.lightboxVideoSource = document.getElementById('lightbox-video-source');
        this.lightboxTitle = document.getElementById('lightbox-title');
        this.lightboxDescription = document.getElementById('lightbox-description');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');

        closeBtn.addEventListener('click', () => this.closeLightbox());
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) this.closeLightbox();
        });
        prevBtn?.addEventListener('click', () => this.showPrevItem());
        nextBtn?.addEventListener('click', () => this.showNextItem());
        
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.classList.contains('show')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.showPrevItem();
                if (e.key === 'ArrowRight') this.showNextItem();
            }
        });
    }
    
    openLightbox(index) {
        this.updateLightbox(index);
        this.lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('show');
        document.body.style.overflow = '';
        if (this.lightboxVideo) {
            this.lightboxVideo.pause();
            this.lightboxVideo.currentTime = 0;
        }
    }

    updateLightbox(index) {
        const item = this.galleryData[index];
        if (!item) return;

        this.lightboxTitle.textContent = item.title;
        this.lightboxDescription.textContent = item.description;

        if (item.type === 'video') {
            this.lightboxImage.style.display = 'none';
            this.lightboxVideo.style.display = 'block';
            this.lightboxVideoSource.src = item.src;
            this.lightboxVideo.load();
            this.lightboxVideo.play();
        } else {
            this.lightboxVideo.style.display = 'none';
            this.lightboxVideo.pause();
            this.lightboxImage.style.display = 'block';
            const imgSrc = item.src || this.galleryData[index].src; // Fallback
            if (imgSrc) this.lightboxImage.src = imgSrc;
            this.lightboxImage.alt = item.alt;
        }
    }

    showPrevItem() {
        this.currentIndex = (this.currentIndex - 1 + this.galleryData.length) % this.galleryData.length;
        this.updateLightbox(this.currentIndex);
    }

    showNextItem() {
        this.currentIndex = (this.currentIndex + 1) % this.galleryData.length;
        this.updateLightbox(this.currentIndex);
    }
    
    // Scroll Animations - Reduziert für Performance
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.feature-item, .service-card, .about-text, .about-image');
        
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            el.classList.add('animate-ready');
            animationObserver.observe(el);
        });
    }

    // Mobile Optimierungen
    initMobileOptimizations() {
        const buttons = document.querySelectorAll('a, button');
        buttons.forEach(btn => {
            btn.style.minWidth = '44px';
            btn.style.minHeight = '44px';
        });
        
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
    }

    // Accessibility Features
    initAccessibility() {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const main = document.querySelector('#main');
                if (main) {
                    main.tabIndex = -1;
                    main.focus();
                    main.scrollIntoView();
                }
            });
        }
        
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.alt = 'Barbershop by Hausar';
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new BarbershopOptimized());
} else {
    new BarbershopOptimized();
}
