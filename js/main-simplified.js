/**
 * BARBERSHOP BY HAUSAR - Erweiterte Parallax & Minimalistisch
 * Moderne, leichte Website mit spektakulären Parallax-Effekten
 */

class BarbershopModern {
    constructor() {
        this.parallaxElements = [];
        this.init();
    }

    async init() {
        console.log('🚀 Initializing Premium Barbershop Website...');
        
        // Lade Header und Footer
        await this.loadHeaderAndFooter();
        
        // Basis-Funktionen
        this.initNavigation();
        this.initHeroHeight(); // Neue stabile Hero-Höhe
        this.initScrollProgress();
        this.initGallerySlider();
        this.initSmoothScrolling();
        this.initMobileMenu();
        this.initLazyLoading();
        this.initContactAnimations();
        
        console.log('✅ Website erfolgreich initialisiert!');
    }

    async loadHeaderAndFooter() {
        try {
            // Header laden
            const headerResponse = await fetch('header.html');
            const headerHtml = await headerResponse.text();
            document.getElementById('header-placeholder').innerHTML = headerHtml;
            
            // Footer laden
            const footerResponse = await fetch('footer.html');
            const footerHtml = await footerResponse.text();
            document.getElementById('footer-placeholder').innerHTML = footerHtml;
            
            console.log('✅ Header und Footer erfolgreich geladen');
        } catch (error) {
            console.error('❌ Fehler beim Laden von Header/Footer:', error);
        }
    }
    
    // Navigation - vereinfacht
    initNavigation() {
        const navbar = document.querySelector('.navbar-premium');
        const navLinks = document.querySelectorAll('.nav-link, .btn-premium');

        // Smooth Scroll für Anker-Links
        navLinks.forEach(link => {
            if (link.hash) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.hash);
                    
                    if (target) {
                        // Mobile Menu schließen wenn offen
                        const navToggle = document.getElementById('nav-toggle');
                        if (navToggle && navToggle.checked) {
                            navToggle.checked = false;
                        }
                        
                        const navHeight = navbar ? navbar.offsetHeight : 80;
                        const targetPosition = target.offsetTop - navHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });

        const headerContainer = document.querySelector('.header-container');
        const logoImg = document.querySelector('.logo-premium img');
        const heroSection = document.querySelector('.hero-premium');
        const topLogoSrc = 'Bilder/logo-header-klein.png';
        const scrolledLogoSrc = 'Bilder/logo-weiss-header-klein.png';

        if (navbar && headerContainer && heroSection) {
            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrollY = window.scrollY;
                        const heroHeight = heroSection.offsetHeight;
                        const headerHeight = headerContainer.offsetHeight;

                        // 1. Sticky-Verhalten der Navbar
                        if (scrollY > 50) {
                            if (headerContainer.style.position !== 'fixed') {
                                headerContainer.style.position = 'fixed';
                            }
                        } else {
                            if (headerContainer.style.position !== 'absolute') {
                                headerContainer.style.position = 'absolute';
                            }
                        }

                        // 2. Stil-Wechsel der Navbar (Farben & Logo)
                        if (scrollY > heroHeight - headerHeight) {
                            if (!headerContainer.classList.contains('scrolled')) {
                                headerContainer.classList.add('scrolled');
                                if (logoImg) logoImg.src = scrolledLogoSrc;
                            }
                        } else {
                            if (headerContainer.classList.contains('scrolled')) {
                                headerContainer.classList.remove('scrolled');
                                if (logoImg) logoImg.src = topLogoSrc;
                            }
                        }
                        
                        // 3. Intelligenter Header (Hell/Dunkel)
                        detectSectionBrightness();

                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
            
            if (logoImg) logoImg.src = topLogoSrc;
        }

        const detectSectionBrightness = () => {
            const sections = document.querySelectorAll('section');
            const headerHeight = headerContainer.offsetHeight;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                
                // Prüft, ob der Header über der Sektion ist
                if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
                    const bgColor = window.getComputedStyle(section).backgroundColor;
                    const isLight = isColorLight(bgColor);

                    if (isLight) {
                        headerContainer.classList.add('on-light-section');
                        headerContainer.classList.remove('on-dark-section');
                    } else {
                        headerContainer.classList.add('on-dark-section');
                        headerContainer.classList.remove('on-light-section');
                    }
                }
            });
        };

        const isColorLight = (color) => {
            if (!color || color === 'transparent') return true; // Default für transparente Hintergründe
            const rgb = color.match(/\d+/g);
            if (!rgb) return true;
            const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
            return brightness > 155;
        };
    }
    
    // Aktive Navigation bei Scroll
    initActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu .nav-link');

        if (!sections.length || !navLinks.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').endsWith('#' + entry.target.id)) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-10% 0px -10% 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Erweiterte Parallax-Effekte
    initAdvancedParallax() {
        let ticking = false;
        
        // Sammle alle parallax-fähigen Elemente
        this.collectParallaxElements();
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateAdvancedParallax();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Mouse-Parallax für zusätzliche Tiefe
        if (window.matchMedia('(min-width: 768px)').matches) {
            this.initMouseParallax();
        }
    }

    collectParallaxElements() {
        this.parallaxElements = [
            // Hero-Elemente
            {
                element: document.querySelector('.hero-content'),
                speed: 0.3,
                type: 'translateY'
            },
            {
                element: document.querySelector('.hero-bg'),
                speed: 0.8,
                type: 'scale'
            },
            // Service Cards - vereinfacht
            ...Array.from(document.querySelectorAll('.service-card')).map((card, index) => ({
                element: card,
                speed: 0.02,
                type: 'translateY',
                direction: 1
            })),
            // Gallery Items - vereinfacht
            ...Array.from(document.querySelectorAll('.gallery-item')).map((item, index) => ({
                element: item,
                speed: 0.02,
                type: 'translateY',
                direction: 1
            })),
            // Feature Items
            ...Array.from(document.querySelectorAll('.feature-item')).map((item, index) => ({
                element: item,
                speed: 0.08 + (index * 0.03),
                type: 'translateY'
            }))
        ].filter(item => item.element);
    }

    updateAdvancedParallax() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;

        this.parallaxElements.forEach(item => {
            const element = item.element;
            const rect = element.getBoundingClientRect();
            
            // Nur animieren wenn Element im Viewport ist oder nahe dran
            if (rect.bottom > -200 && rect.top < windowHeight + 200) {
                const elementTop = rect.top + scrollTop;
                const elementHeight = rect.height;
                const elementCenter = elementTop + (elementHeight / 2);
                const scrollPercent = (scrollTop - elementCenter + windowHeight) / (windowHeight + elementHeight);
                
                this.applyParallaxTransform(element, item, scrollPercent, scrollTop);
            }
        });

        // Spezielle Hero-Effekte
        this.updateHeroParallax(scrollTop);
        
        // Background-Effekte
        this.updateBackgroundParallax(scrollTop);
    }

    applyParallaxTransform(element, config, scrollPercent, scrollTop) {
        const { speed, type, direction = 1 } = config;
        const movement = scrollTop * speed * direction;

        switch (type) {
            case 'translateY':
                element.style.transform = `translateY(${movement}px)`;
                break;
                
            case 'scale':
                const scale = 1 + (scrollPercent * 0.1 * speed);
                element.style.transform = `scale(${Math.max(0.8, Math.min(1.2, scale))})`;
                break;
                
            case 'complex':
                // Vereinfacht - nur translateY
                element.style.transform = `translateY(${movement}px)`;
                break;
                
            case 'rotate':
                const rotation = scrollPercent * 360 * speed;
                element.style.transform = `rotate(${rotation}deg)`;
                break;
        }
    }

    updateHeroParallax(scrollTop) {
        // Hero Background Layers
        const heroSlides = document.querySelectorAll('.slide.active img');
        heroSlides.forEach((img, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollTop * speed);
            const rotation = Math.sin(scrollTop * 0.001) * 0.5;
            img.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
        });

        // Hero Content Float
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const floatY = Math.sin(Date.now() * 0.001) * 5;
            const scrollY = -(scrollTop * 0.2);
            heroContent.style.transform = `translateY(${scrollY + floatY}px) translateZ(20px)`;
        }

        // Hero Stats Stagger
        const stats = document.querySelectorAll('.stat');
        stats.forEach((stat, index) => {
            const delay = index * 0.1;
            const movement = -(scrollTop * (0.15 + delay));
            const tilt = Math.sin((scrollTop + index * 100) * 0.01) * 2;
            stat.style.transform = `translateY(${movement}px) rotateZ(${tilt}deg)`;
        });
    }

    updateBackgroundParallax(scrollTop) {
        // About Section Background
        const aboutParallax = document.querySelector('.about-parallax');
        if (aboutParallax) {
            const movement = scrollTop * 0.3;
            const rotation = Math.sin(scrollTop * 0.001) * 5;
            aboutParallax.style.transform = `translate3d(${movement}px, ${movement * 0.5}px, 0) rotate(${rotation}deg)`;
        }

        // Service Section - vereinfacht (Background-Rotation entfernt)
    }

    // Mouse-Parallax für Desktop
    initMouseParallax() {
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
        });

        const updateMouseParallax = () => {
            targetX += (mouseX - targetX) * 0.1;
            targetY += (mouseY - targetY) * 0.1;

            // Hero Logo Mouse Following
            const heroLogo = document.querySelector('.hero-logo');
            if (heroLogo) {
                const moveX = targetX * 20;
                const moveY = targetY * 20;
                heroLogo.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
            }

            // Service Cards Mouse Tilt - entfernt für bessere Performance

            requestAnimationFrame(updateMouseParallax);
        };

        updateMouseParallax();
    }

    // Lazy Loading optimiert
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

    // Slider mit verbesserter Performance
    initOptimizedSlider() {
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
        
        // Langsamere Wechsel für minimalistisches Design
        setInterval(changeSlide, 8000);
        
        // Preload nächstes Bild
        setTimeout(() => {
            const nextIndex = (currentSlide + 1) % slides.length;
            const nextImg = slides[nextIndex].querySelector('img[data-src]');
            if (nextImg) {
                nextImg.src = nextImg.dataset.src;
                nextImg.removeAttribute('data-src');
            }
        }, 4000);
    }

    // Gallery mit Lightbox (ohne Load More)
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
                    title: info?.querySelector('h4')?.textContent || 'Video',
                    description: info?.querySelector('p')?.textContent || ''
                };
            } else {
                const img = item.querySelector('img');
                const overlay = item.querySelector('.gallery-overlay');
                return {
                    type: 'image',
                    src: img.src || img.dataset.src,
                    alt: img.alt,
                    title: overlay?.querySelector('h4')?.textContent || 'Bild',
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

        this.initLightboxControls(lightbox, closeBtn);
    }

    initLightboxControls(lightbox, closeBtn) {
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
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.showPrevItem());
        if (nextBtn) nextBtn.addEventListener('click', () => this.showNextItem());
        
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
        } else {
            this.lightboxVideo.style.display = 'none';
            if (this.lightboxVideo) this.lightboxVideo.pause();
            this.lightboxImage.style.display = 'block';
            this.lightboxImage.src = item.src;
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
    
    // Erweiterte Scroll-Animationen
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.feature-item, .service-card, .about-text, .about-image, .gallery-item');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Staggered Animation für Gruppen
                    if (entry.target.classList.contains('gallery-item')) {
                        const siblings = Array.from(entry.target.parentNode.children);
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        animatedElements.forEach(el => {
            el.classList.add('animate-ready');
            animationObserver.observe(el);
        });
    }

    // Erweiterte Effekte
    initAdvancedEffects() {
        // Smooth scrollbar falls verfügbar
        if (window.Scrollbar) {
            window.Scrollbar.init(document.body, {
                damping: 0.1,
                renderByPixels: true,
                alwaysShowTracks: false,
                continuousScrolling: true
            });
        }

        // Performance Monitor
        this.monitorPerformance();
    }

    monitorPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // Reduziere Effekte bei niedriger FPS
                if (fps < 30) {
                    document.body.classList.add('low-performance');
                    this.reducedMotion = true;
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkFPS);
        };
        
        requestAnimationFrame(checkFPS);
    }

    // Mobile Optimierungen
    initMobileOptimizations() {
        // Touch-friendly Buttons
        const buttons = document.querySelectorAll('a, button');
        buttons.forEach(btn => {
            btn.style.minWidth = '44px';
            btn.style.minHeight = '44px';
        });
        
        // Reduzierte Animation-Dauer für bessere Performance
        document.documentElement.style.setProperty('--transition-fast', '0.15s');
        document.documentElement.style.setProperty('--transition-normal', '0.2s');
        
        // Parallax auf Mobile deaktivieren
        this.updateAdvancedParallax = () => {};
        this.initMouseParallax = () => {};
    }

    // Accessibility
    initAccessibility() {
        // Skip Link
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
        
        // Alt-Text für Bilder ohne Alt
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.alt = 'Barbershop by Hausar - Herrenfriseur Braunschweig';
        });
        
        // Keyboard Navigation Styles
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });

        // ARIA Labels für Navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (!link.getAttribute('aria-label')) {
                const text = link.textContent.trim();
                link.setAttribute('aria-label', `Navigiere zu ${text}`);
            }
        });

        // Reduced Motion Support
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
            this.updateAdvancedParallax = () => {};
        }
    }

    // Utility: Smooth Scroll Polyfill für ältere Browser
    smoothScrollTo(target, duration = 500) {
        const targetPosition = target.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // NEU: Scroll-Reveal System
    initScrollReveal() {
        const revealSections = document.querySelectorAll('.section-reveal');
        const staggerElements = document.querySelectorAll('.reveal-stagger');
        
        if (!('IntersectionObserver' in window)) {
            // Fallback für alte Browser
            revealSections.forEach(section => section.classList.add('revealed'));
            staggerElements.forEach(element => element.classList.add('revealed'));
            return;
        }

        // Section Reveal Observer
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Performance: Observer nach Reveal entfernen
                    setTimeout(() => {
                        sectionObserver.unobserve(entry.target);
                    }, 1500);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Stagger Elements Observer
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Kleine Verzögerung für besseren Effekt
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, 200);
                    
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observer starten
        revealSections.forEach(section => sectionObserver.observe(section));
        staggerElements.forEach(element => staggerObserver.observe(element));
        
        // Erstes Section nach kurzer Verzögerung anzeigen
        setTimeout(() => {
            const firstSection = document.querySelector('.section-reveal');
            if (firstSection && window.scrollY < 100) {
                // Nur wenn User noch oben ist
                firstSection.style.transition = 'all 2s ease';
            }
        }, 1000);
    }

    // SEO und Performance Optimierungen
    initSEOOptimizations() {
        // Structured Data für lokale Geschäfte
        this.enhanceLocalBusiness();
        
        // Performance Monitoring
        this.initPerformanceMonitoring();
        
        // Enhanced Alt-Text für bessere Accessibility
        this.enhanceImageAccessibility();
    }
    
    enhanceLocalBusiness() {
        // Add microdata for local business
        const businessElement = document.querySelector('.footer');
        if (businessElement) {
            businessElement.setAttribute('itemscope', '');
            businessElement.setAttribute('itemtype', 'https://schema.org/BarberShop');
        }
    }
    
    enhanceImageAccessibility() {
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            img.alt = 'Barbershop by Hausar - Premium Herrenpflege Braunschweig';
        });
    }

    // Performance Monitoring
    initPerformanceMonitoring() {
        if ('performance' in window) {
            // Core Web Vitals tracking
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    // Log performance metrics for optimization
                    console.debug(`Performance: ${entry.name} - ${entry.duration}ms`);
                });
            });
            
            observer.observe({entryTypes: ['measure', 'navigation']});
        }
    }

            // Dynamische Viewport-Höhe - exakt wie hagis.de
    initDynamicViewportHeight() {
        console.log('🚀 Hagis.de Style - Exakte Bildschirmhöhe wird gesetzt...');
        
        // Funktion zur Berechnung der exakten Viewport-Höhe
        const setRealViewportHeight = () => {
            // Exakte Bildschirmhöhe messen
            const realHeight = window.innerHeight;
            
            // CSS Custom Property für moderne Browser setzen
            document.documentElement.style.setProperty('--vh', `${realHeight * 0.01}px`);
            
            const heroSection = document.querySelector('.hero-premium');
            if (heroSection) {
                // Hagis.de Style: Hero Section nimmt EXAKT die Bildschirmhöhe ein
                heroSection.style.height = `${realHeight}px`;
                
                console.log(`✅ Hagis.de Style: Hero Section = ${realHeight}px (Bildschirmhöhe)`);
            }
        };

        // Initial setzen
        setRealViewportHeight();
        
        // Bei Resize (wichtig für Mobile Landscape/Portrait)
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setRealViewportHeight, 100);
        }, { passive: true });

        // Für Mobile: bei Orientation Change
        window.addEventListener('orientationchange', () => {
            setTimeout(setRealViewportHeight, 250);
        });

        // Spezielle Mobile Browser Behandlung
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            // Bei Scroll-Events für Mobile Safari (ändert Viewport)
            let scrollTimer;
            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(setRealViewportHeight, 200);
            }, { passive: true });
        }
    }

    initHeroHeight() {
        const updateHeroHeight = () => {
            const realHeight = window.innerHeight;
            const heroSection = document.querySelector('.hero-premium');
            if (heroSection) {
                // Stabile Höhe: Verwende min-height statt height für bessere Stabilität
                heroSection.style.minHeight = `${realHeight}px`;
                heroSection.style.height = `${realHeight}px`;
                console.log(`✅ Hero Section = ${realHeight}px (stabil)`);
            }
        };

        // Initial setzen
        updateHeroHeight();
        
        // Bei Resize aktualisieren
        window.addEventListener('resize', updateHeroHeight, { passive: true });
    }

    // Scroll Progress Bar
    initScrollProgress() {
        const progressBar = document.getElementById('scrollProgress');
        if (!progressBar) return;

        let ticking = false;

        const updateProgress = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrolled = (window.scrollY / windowHeight) * 100;
                    progressBar.style.width = `${Math.min(scrolled, 100)}%`;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress(); // Initial call
    }

    // Easter Eggs & Fun Features
    initEasterEggs() {
        // Konami Code (↑↑↓↓←→←→BA)
        let konamiCode = [];
        const targetCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                           'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                           'KeyB', 'KeyA'];

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            
            if (konamiCode.length > targetCode.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(targetCode)) {
                this.activateKonamiMode();
                konamiCode = [];
            }
        });

        // Logo Click Counter
        let logoClicks = 0;
        const logos = document.querySelectorAll('.hero-logo, .logo-premium img, .footer-logo img');
        
        logos.forEach(logo => {
            logo.addEventListener('click', () => {
                logoClicks++;
                if (logoClicks === 7) { // Lucky Number 7
                    this.showEasterEggMessage();
                    logoClicks = 0;
                }
            });
        });
    }

    activateKonamiMode() {
        document.body.classList.add('konami-active');
        
        // Zeige eine nette Nachricht
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #DAA520, #B8860B);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            font-size: 1.2rem;
            text-align: center;
            z-index: 10001;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        `;
        message.innerHTML = `
            <h3>🎉 Konami Code aktiviert!</h3>
            <p>Sie haben das versteckte Feature gefunden!</p>
            <small>Die Farben tanzen für Sie ✨</small>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            document.body.classList.remove('konami-active');
        }, 3000);
    }

    showEasterEggMessage() {
        const messages = [
            "🎨 Sie mögen Logos, was?",
            "✂️ 7 Klicks für 7 Jahre Glück!",
            "🏆 Logo-Klick-Meister!",
            "⭐ Sie haben gute Augen!"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Temporäre Nachricht anzeigen
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: var(--primary-gold);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10001;
            animation: slideInRight 0.5s ease;
            box-shadow: 0 4px 20px rgba(218, 165, 32, 0.3);
        `;
        notification.textContent = randomMessage;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease forwards';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new BarbershopModern());
} else {
    new BarbershopModern();
}

// Mobile Menu Script (standalone für bessere Performance)
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link, .btn-premium');

    if (navToggle) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navToggle.checked) {
                    navToggle.checked = false;
                }
            });
        });
    }
});
