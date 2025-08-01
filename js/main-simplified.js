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
            const logoImg = headerContainer.querySelector('.logo-premium img');
            const isMobile = window.innerWidth <= 768;
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrollY = window.scrollY;
                        const heroHeight = heroSection.offsetHeight;
                        // Später Übergang: erst bei 95% der Hero-Höhe beginnt der Wechsel
                        const switchPoint = heroHeight * 0.95;
                        
                        if (scrollY > switchPoint) {
                            headerContainer.classList.add('scrolled');
                            // Logo-Swap nur auf Desktop
                            if (!isMobile && logoImg) {
                                logoImg.src = 'Bilder/logo-weiss-header-klein.png';
                            }
                        } else {
                            headerContainer.classList.remove('scrolled');
                            // Logo-Swap nur auf Desktop
                            if (!isMobile && logoImg) {
                                logoImg.src = 'Bilder/logo-header-klein.png';
                            }
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

    // Erweiterte Lightbox für Gallery mit Navigation
    initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDescription = document.getElementById('lightbox-description');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.getElementById('lightbox-prev');
        const lightboxNext = document.getElementById('lightbox-next');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (!lightbox || !lightboxImage || !lightboxClose) return;

        this.galleryData = [];
        this.currentIndex = 0;

        // Gallery Items sammeln
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.gallery-overlay');
            const title = overlay?.querySelector('h4')?.textContent || 'Bild';
            const description = overlay?.querySelector('p')?.textContent || '';

            this.galleryData.push({
                src: img.src,
                alt: img.alt,
                title: title,
                description: description
            });

            // Click-Handler
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                this.currentIndex = index;
                this.openLightbox();
            });
        });

        // Lightbox öffnen
        this.openLightbox = () => {
            const data = this.galleryData[this.currentIndex];
            lightboxImage.src = data.src;
            lightboxImage.alt = data.alt;
            if (lightboxTitle) lightboxTitle.textContent = data.title;
            if (lightboxDescription) lightboxDescription.textContent = data.description;
            
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        };

        // Lightbox schließen
        const closeLightbox = () => {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
        };

        // Navigation
        const showPrev = () => {
            this.currentIndex = (this.currentIndex - 1 + this.galleryData.length) % this.galleryData.length;
            this.openLightbox();
        };

        const showNext = () => {
            this.currentIndex = (this.currentIndex + 1) % this.galleryData.length;
            this.openLightbox();
        };

        // Event Listeners
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
        if (lightboxNext) lightboxNext.addEventListener('click', showNext);

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('show')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') showPrev();
                if (e.key === 'ArrowRight') showNext();
            }
        });
    }
}

// Website initialisieren
document.addEventListener('DOMContentLoaded', () => {
    new BarbershopSimple();
});