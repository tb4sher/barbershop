/**
 * BARBERSHOP BY HAUSAR - Optimierte Version
 * Performance-fokussiert mit reduzierten Animationen
 */

class BarbershopOptimized {
    constructor() {
        this.init();
    }

    init() {
        // Kritische Funktionen zuerst
        this.initNavigation();
        this.initScrollProgress();
        
        // Lazy Loading und Performance
        if ('IntersectionObserver' in window) {
            this.initLazyLoading();
            this.initScrollAnimations();
        }
        
        // Interaktive Features
        this.initGallery();
        this.initOptimizedSlider();
        
        // Mobile Optimierungen
        if (window.matchMedia('(max-width: 768px)').matches) {
            this.initMobileOptimizations();
        }
        
        // Accessibility
        this.initAccessibility();
    }

    // Navigation mit reduzierten Abständen
    initNavigation() {
        const navbar = document.querySelector('.navbar-premium');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link, .btn-premium');

        // Smooth Scroll für Anker-Links
        navLinks.forEach(link => {
            if (link.getAttribute('href')?.startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const target = document.querySelector(targetId);
                    
                    if (target) {
                        // Mobile Menu schließen
                        if (navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                            menuToggle.classList.remove('active');
                            menuToggle.setAttribute('aria-expanded', 'false');
                            document.body.style.overflow = '';
                        }
                        
                        // Smooth scroll mit Offset
                        const navHeight = navbar.offsetHeight;
                        const targetPosition = target.offsetTop - navHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });

        // Mobile Menu Toggle
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                const isActive = navMenu.classList.contains('active');
                
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', !isActive);
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = isActive ? '' : 'hidden';
            });

            // Close menu on outside click
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        }

        // Navbar scroll effect - optimiert
        let lastScroll = 0;
        let ticking = false;
        
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        }, { passive: true });
    }

    // Scroll Progress Bar
    initScrollProgress() {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;
        
        let ticking = false;
        
        const updateProgress = () => {
            const winScroll = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }, { passive: true });
    }

    // Optimiertes Lazy Loading
    initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src], img.lazy');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Load image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.classList.add('loaded');
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
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
        let currentSlide = 0;
        
        // Preload first two slides
        slides.forEach((slide, index) => {
            if (index <= 1) {
                const img = slide.querySelector('img[data-src]');
                if (img) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            }
        });
        
        // Start slideshow
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Load next image if needed
            const nextSlide = slides[currentSlide];
            const img = nextSlide.querySelector('img[data-src]');
            if (img) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            
            nextSlide.classList.add('active');
            
            // Preload next image
            const upcomingIndex = (currentSlide + 1) % slides.length;
            const upcomingImg = slides[upcomingIndex].querySelector('img[data-src]');
            if (upcomingImg) {
                const preloadImg = new Image();
                preloadImg.src = upcomingImg.dataset.src;
            }
        }, 5000);
    }

    // Gallery mit Lightbox
    initGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDescription = document.getElementById('lightbox-description');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        let currentIndex = 0;
        const galleryData = [];
        
        // Collect gallery data
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.gallery-overlay');
            
            if (img) {
                galleryData.push({
                    src: img.src || img.dataset.src,
                    alt: img.alt,
                    title: overlay?.querySelector('h4')?.textContent || '',
                    description: overlay?.querySelector('p')?.textContent || ''
                });
                
                // Add click event
                item.addEventListener('click', () => {
                    currentIndex = index;
                    this.openLightbox(currentIndex);
                });
                
                item.style.cursor = 'pointer';
            }
        });
        
        // Lightbox controls
        closeBtn?.addEventListener('click', () => this.closeLightbox());
        
        lightbox?.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });
        
        prevBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
            this.updateLightbox(currentIndex);
        });
        
        nextBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % galleryData.length;
            this.updateLightbox(currentIndex);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox?.classList.contains('show')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        prevBtn.click();
                        break;
                    case 'ArrowRight':
                        nextBtn.click();
                        break;
                }
            }
        });
        
        // Store methods for lightbox
        this.galleryData = galleryData;
        this.lightbox = lightbox;
        this.lightboxImage = lightboxImage;
        this.lightboxTitle = lightboxTitle;
        this.lightboxDescription = lightboxDescription;
    }
    
    openLightbox(index) {
        const item = this.galleryData[index];
        if (!item) return;
        
        this.updateLightbox(index);
        this.lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    updateLightbox(index) {
        const item = this.galleryData[index];
        if (!item) return;
        
        // Load image if needed
        if (item.src) {
            this.lightboxImage.src = item.src;
            this.lightboxImage.alt = item.alt;
        }
        
        this.lightboxTitle.textContent = item.title;
        this.lightboxDescription.textContent = item.description;
        
        // Update navigation buttons
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        prevBtn.style.display = this.galleryData.length > 1 ? 'flex' : 'none';
        nextBtn.style.display = this.galleryData.length > 1 ? 'flex' : 'none';
    }
    
    closeLightbox() {
        this.lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Scroll Animations - Reduziert für Performance
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.feature-item, .service-card, .about-text, .about-image');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    animationObserver.unobserve(entry.target);
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
        // Touch-optimierte Buttons
        const buttons = document.querySelectorAll('a, button');
        buttons.forEach(btn => {
            const rect = btn.getBoundingClientRect();
            if (rect.width < 44 || rect.height < 44) {
                btn.style.minWidth = '44px';
                btn.style.minHeight = '44px';
            }
        });
        
        // Vereinfachte Animationen
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        
        // Disable parallax effects
        const parallaxElements = document.querySelectorAll('[data-speed]');
        parallaxElements.forEach(el => el.removeAttribute('data-speed'));
    }

    // Accessibility Features
    initAccessibility() {
        // Skip link functionality
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
        
        // Ensure all images have alt text
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.alt = 'Barbershop by Hausar';
        });
        
        // Add focus visible for keyboard navigation
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
    document.addEventListener('DOMContentLoaded', () => {
        new BarbershopOptimized();
    });
} else {
    new BarbershopOptimized();
}

// Register Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed
    });
}