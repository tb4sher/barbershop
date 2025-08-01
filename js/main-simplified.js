/**
 * BARBERSHOP BY HAUSAR - Vereinfachtes JavaScript
 * Nur die wichtigsten Funktionen für optimale Performance
 */

class BarbershopSimple {
    constructor() {
        this.init();
    }

    init() {
        console.log('🚀 Barbershop Website wird geladen...');
        
        // Kern-Funktionalitäten
        this.initNavigation();
        this.initHeroHeight();
        this.initScrollProgress();
        this.initLazyLoading();
        this.initMobileMenu();
        this.initLightbox();
        this.initSlider();
        
        console.log('✅ Website erfolgreich geladen!');
    }

    // Hero Slider
    initSlider() {
        const slider = document.querySelector('.snapshot-slider');
        if (!slider) return;
        
        const slides = slider.querySelectorAll('.slide');
        if (slides.length <= 1) return;

        let currentSlide = 0;
        
        const changeSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            
            const nextSlide = slides[currentSlide];
            const img = nextSlide.querySelector('img[data-src]');
            if (img) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            
            nextSlide.classList.add('active');
        };
        
        // Slide alle 6 Sekunden wechseln
        setInterval(changeSlide, 6000);
    }

    // Navigation mit Smooth Scroll
    initNavigation() {
        const navbar = document.querySelector('.navbar-premium');
        const headerContainer = document.querySelector('.header-container');
        const heroSection = document.querySelector('.hero-premium');
        
        // Smooth Scroll für Anker-Links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    const navHeight = navbar ? navbar.offsetHeight : 80;
                    window.scrollTo({
                        top: target.offsetTop - navHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Optimierte Navbar Scroll-Effekte mit smootherem Übergang
        if (headerContainer && heroSection) {
            let ticking = false;
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrollY = window.scrollY;
                        const heroHeight = heroSection.offsetHeight;
                        // Sanfterer Übergang: bereits bei 80% der Hero-Höhe beginnt der Wechsel
                        const switchPoint = heroHeight * 0.8;
                        
                        if (scrollY > switchPoint) {
                            headerContainer.classList.add('scrolled');
                        } else {
                            headerContainer.classList.remove('scrolled');
                        }
                        
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        }
    }

    // Hero-Section Höhe anpassen
    initHeroHeight() {
        const setHeroHeight = () => {
            const heroSection = document.querySelector('.hero-premium');
            if (heroSection) {
                heroSection.style.height = `${window.innerHeight}px`;
            }
        };

        setHeroHeight();
        window.addEventListener('resize', setHeroHeight, { passive: true });
    }

    // Scroll Progress Bar
    initScrollProgress() {
        const progressBar = document.getElementById('scrollProgress');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${Math.min(scrolled, 100)}%`;
        }, { passive: true });
    }

    // Lazy Loading für Bilder
    initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Mobile Menu
    initMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle) {
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navToggle.checked) {
                        navToggle.checked = false;
                    }
                });
            });
        }
    }

    // Lightbox für Gallery
    initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxClose = document.querySelector('.lightbox-close');
        const galleryItems = document.querySelectorAll('.gallery-item img');

        if (!lightbox || !lightboxImage || !lightboxClose) return;

        // Gallery Items klickbar machen
        galleryItems.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });

        // Lightbox schließen
        const closeLightbox = () => {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // ESC-Taste zum Schließen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) {
                closeLightbox();
            }
        });
    }
}

// Website initialisieren
document.addEventListener('DOMContentLoaded', () => {
    new BarbershopSimple();
});