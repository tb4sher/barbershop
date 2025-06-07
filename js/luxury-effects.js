/**
 * PREMIUM BARBERSHOP JS - ULTRA LUXURIÖSE INTERAKTIONEN
 * Erweiterte Animationen und visuelle Effekte mit Mega-Parallax System
 */

class LuxuryBarberShop {
    constructor() {
        this.particles = [];
        this.scrollPosition = 0;
        this.isScrolling = false;
        this.megaParallaxEnabled = true;
        this.performanceMode = false;
        this.init();
    }

    // Initialize all effects
    init() {
        this.loadingScreen();
        this.createParticleSystem();
        this.createAdvancedParticleSystem();
        this.initScrollAnimations();
        this.initScrollProgress();
        this.initNavigation();
        this.initLuxuryEffects();
        this.init3DCardEffects();
        this.initLuxuryCursor();
        this.initMorphingBackground();
        this.initTypewriterEffect();
        this.initParallaxEffect();
        this.initMegaParallaxSystem();
        this.initInteractiveElements();
        this.createFloatingElements();
        this.optimizePerformance();
    }

    // Luxuriöser Loading Screen
    loadingScreen() {
        const loader = document.createElement('div');
        loader.className = 'luxury-loader';
        loader.innerHTML = `
            <div class="luxury-spinner"></div>
            <div class="luxury-loading-text">Barbershop BS</div>
        `;
        document.body.appendChild(loader);

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.remove();
                    this.startEntryAnimations();
                }, 600);
            }, 1500);
        });
    }

    // Partikel System
    createParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'luxury-particles';
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 50; i++) {
            this.createParticle(particleContainer);
        }

        setInterval(() => {
            if (Math.random() < 0.3) {
                this.createParticle(particleContainer);
            }
        }, 3000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const startX = Math.random() * window.innerWidth;
        const delay = Math.random() * 15;
        const size = Math.random() * 6 + 2;
        
        particle.style.left = startX + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDelay = delay + 's';
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 20000);
    }

    // MEGA PARALLAX SYSTEM - Das Herzstück der ultra-Parallax Effekte
    initMegaParallaxSystem() {
        console.log('🚀 Initialisiere Mega-Parallax System');
        
        // Scroll-Event mit ultra-performance throttling
        let ticking = false;
        const updateMegaParallax = () => {
            if (!this.megaParallaxEnabled) return;
            
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPercent = scrolled / (documentHeight - windowHeight);
            
            // Ultra-parallax für verschiedene Element-Typen
            this.updateHeroParallax(scrolled, scrollPercent);
            this.updateSectionParallax(scrolled);
            this.updateFloatingElements(scrolled, scrollPercent);
            this.updateGalleryParallax(scrolled);
            this.updateTextParallax(scrolled);
            this.updateBackgroundPatterns(scrolled);
            this.updateServiceCardsParallax(scrolled);
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateMegaParallax);
                ticking = true;
            }
        });

        // Resize handler für responsive Parallax
        window.addEventListener('resize', () => {
            this.recalculateParallaxDimensions();
        });
    }

    updateHeroParallax(scrolled, scrollPercent) {
        // Hero Section mit ultra-advanced 3D Parallax
        const heroSection = document.querySelector('.hero-section, .hero');
        if (heroSection) {
            const intensity = this.performanceMode ? 0.3 : 0.7;
            const moveY = scrolled * intensity;
            const rotateX = scrollPercent * 5;
            const scale = 1 + scrollPercent * 0.1;
            
            heroSection.style.transform = `translateY(${moveY}px) rotateX(${rotateX}deg) scale(${scale})`;
        }

        // Hero Background Layers
        document.querySelectorAll('.hero-bg-layer').forEach((layer, index) => {
            const speed = 0.2 + (index * 0.15);
            const moveY = scrolled * speed;
            const opacity = Math.max(0.1, 1 - scrollPercent * 0.8);
            
            layer.style.transform = `translateY(${moveY}px)`;
            layer.style.opacity = opacity;
        });
    }

    updateSectionParallax(scrolled) {
        // Parallax Sections mit individuellen Effekten
        document.querySelectorAll('.parallax-section').forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const sectionCenter = rect.top + rect.height / 2;
                const viewportCenter = window.innerHeight / 2;
                const distanceFromCenter = (sectionCenter - viewportCenter) / viewportCenter;
                
                // Multi-layer parallax für jede Section
                const backgroundLayers = section.querySelectorAll('.parallax-bg-layer');
                backgroundLayers.forEach((layer, layerIndex) => {
                    const speed = 0.1 + (layerIndex * 0.1);
                    const moveY = distanceFromCenter * 50 * speed;
                    const rotateZ = distanceFromCenter * 2;
                    
                    layer.style.transform = `translateY(${moveY}px) rotateZ(${rotateZ}deg)`;
                });
            }
        });
    }

    updateFloatingElements(scrolled, scrollPercent) {
        // Floating Decoration Elements
        document.querySelectorAll('.floating-decoration').forEach((element) => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            const amplitude = parseFloat(element.dataset.amplitude) || 30;
            const phase = parseFloat(element.dataset.phase) || 0;
            
            const moveY = Math.sin(scrolled * 0.01 + phase) * amplitude;
            const moveX = Math.cos(scrolled * 0.008 + phase) * (amplitude * 0.5);
            const rotation = scrolled * speed * 0.1;
            
            element.style.transform = `translateX(${moveX}px) translateY(${moveY}px) rotate(${rotation}deg)`;
        });

        // Geometric Shape Parallax
        document.querySelectorAll('.geometric-shape').forEach((shape, index) => {
            const baseSpeed = 0.3 + (index % 3) * 0.2;
            const moveY = scrolled * baseSpeed;
            const rotation = scrolled * 0.1 + (index * 45);
            const scale = 1 + Math.sin(scrolled * 0.01 + index) * 0.1;
            
            shape.style.transform = `translateY(${moveY}px) rotate(${rotation}deg) scale(${scale})`;
        });
    }

    updateGalleryParallax(scrolled) {
        // Gallery Items mit Enhanced Parallax
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const moveY = progress * 40 - 20;
                const scale = 0.95 + progress * 0.1;
                const rotation = (progress - 0.5) * 5;
                
                item.style.transform = `translateY(${moveY}px) scale(${scale}) rotate(${rotation}deg)`;
                
                // Shimmer effect
                const shimmer = item.querySelector('.shimmer-overlay');
                if (shimmer) {
                    shimmer.style.transform = `translateX(${progress * 200 - 100}%)`;
                }
            }
        });
    }

    updateTextParallax(scrolled) {
        // Text Elements mit Parallax
        document.querySelectorAll('.parallax-text').forEach((text) => {
            const rect = text.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const progress = (window.innerHeight - rect.top) / window.innerHeight;
                const moveY = (progress - 0.5) * 30;
                const opacity = Math.max(0.3, Math.sin(progress * Math.PI));
                
                text.style.transform = `translateY(${moveY}px)`;
                text.style.opacity = opacity;
            }
        });
    }

    updateBackgroundPatterns(scrolled) {
        // Background Pattern Movement
        document.querySelectorAll('.pattern-bg').forEach((pattern, index) => {
            const speed = 0.05 + (index % 4) * 0.02;
            const moveX = scrolled * speed * (index % 2 === 0 ? 1 : -1);
            const moveY = scrolled * speed * 0.5;
            
            pattern.style.backgroundPosition = `${moveX}px ${moveY}px`;
        });

        // Morphing Background Shapes
        document.querySelectorAll('.morphing-shape').forEach((shape, index) => {
            const progress = scrolled * 0.001;
            const scale = 1 + Math.sin(progress + index) * 0.2;
            const rotation = progress * 20 + (index * 72);
            
            shape.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
        });
    }

    updateServiceCardsParallax(scrolled) {
        // Service Cards mit 3D Parallax
        document.querySelectorAll('.service-card').forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const mouseX = (centerX - window.innerWidth / 2) / window.innerWidth;
                const mouseY = (centerY - window.innerHeight / 2) / window.innerHeight;
                
                const rotateY = mouseX * 10;
                const rotateX = -mouseY * 10;
                const translateZ = Math.abs(mouseX) + Math.abs(mouseY) * 20;
                
                card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${translateZ}px)`;
            }
        });
    }

    // Scroll Animationen
    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
            observer.observe(el);
        });

        // Standard Parallax Scroll Effect
        window.addEventListener('scroll', () => {
            this.scrollPosition = window.pageYOffset;
            this.updateNavbar();
        });
    }

    updateNavbar() {
        const navbar = document.querySelector('.navbar-ultra') || document.querySelector('.navbar');
        if (navbar) {
            if (this.scrollPosition > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    // Navigation
    initNavigation() {
        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }
    }

    // Luxury Effects
    initLuxuryEffects() {
        // Service Cards Hover Effect
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('elevated');
                this.createSparkleEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('elevated');
            });
        });

        // Gallery Items Enhancement
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform += ' scale(1.05)';
                this.createGlowEffect(item);
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = item.style.transform.replace(' scale(1.05)', '');
            });
        });
    }

    // Typewriter Effect
    initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid #d4af37';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        });
    }

    // Parallax Effect
    initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const moveY = scrolled * speed;
                element.style.transform = `translateY(${moveY}px)`;
            });
        });
    }

    // Interactive Elements
    initInteractiveElements() {
        // Button Ripple Effect
        document.querySelectorAll('.btn-luxury, .cta-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                ripple.className = 'ripple-effect';
                
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Counter Animation
    initCounterAnimation() {
        const counters = document.querySelectorAll('.counter');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += step;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }

    // Price Card Effects
    initPriceCardEffects() {
        document.querySelectorAll('.price-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateY(5deg)';
                card.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateY(0)';
                card.style.boxShadow = '';
            });
        });
    }

    // Entry Animations
    startEntryAnimations() {
        // Hero section entrance
        const hero = document.querySelector('.hero-section, .hero');
        if (hero) {
            hero.classList.add('animate-entrance');
        }
        
        // Staggered animations for elements
        document.querySelectorAll('.animate-on-load').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('loaded');
            }, index * 200);
        });
    }

    // Advanced Particle System
    createAdvancedParticleSystem() {
        const container = document.createElement('div');
        container.className = 'advanced-particles';
        document.body.appendChild(container);

        for (let i = 0; i < 30; i++) {
            this.createLuxuryParticle(container, 'star');
        }
        
        for (let i = 0; i < 20; i++) {
            this.createLuxuryParticle(container, 'diamond');
        }
    }

    createLuxuryParticle(container, type) {
        const particle = document.createElement('div');
        particle.className = `luxury-particle particle-${type}`;
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const delay = Math.random() * 10;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.animationDelay = delay + 's';
        
        container.appendChild(particle);
    }

    // Scroll Progress Indicator
    initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // 3D Card Effects
    init3DCardEffects() {
        document.querySelectorAll('.card-3d').forEach(card => {
            this.create3DCardEffect(card);
        });
    }

    create3DCardEffect(card) {
        card.addEventListener('mousemove', (e) => {
            this.update3DCardPosition(e);
        });
        
        card.addEventListener('mouseleave', () => {
            this.reset3DCardEffect(card);
        });
    }

    update3DCardPosition(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 4;
        const rotateY = (centerX - x) / 4;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }

    reset3DCardEffect(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }

    // Luxury Cursor
    initLuxuryCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'luxury-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .clickable').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }

    // Morphing Background
    initMorphingBackground() {
        const canvas = document.createElement('canvas');
        canvas.className = 'morphing-background';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.insertBefore(canvas, document.body.firstChild);

        const ctx = canvas.getContext('2d');
        let animationId;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const time = Date.now() * 0.001;
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width / 2
            );
            
            gradient.addColorStop(0, `rgba(212, 175, 55, ${0.1 + Math.sin(time) * 0.05})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            animationId = requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Floating Elements
    createFloatingElements() {
        const elements = ['✂️', '💎', '⭐', '👑'];
        
        elements.forEach((element, index) => {
            const floatingEl = document.createElement('div');
            floatingEl.className = 'floating-luxury';
            floatingEl.textContent = element;
            floatingEl.style.left = Math.random() * 100 + '%';
            floatingEl.style.animationDelay = index * 0.5 + 's';
            document.body.appendChild(floatingEl);
        });
    }

    // Performance Optimization
    optimizePerformance() {
        // Reduce particle count on mobile
        if (window.innerWidth < 768) {
            this.performanceMode = true;
            document.querySelectorAll('.luxury-particle').forEach((p, index) => {
                if (index % 2 === 0) p.style.display = 'none';
            });
        }

        // Reduce particles when battery is low (if supported)
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.3) {
                    this.performanceMode = true;
                    document.querySelectorAll('.luxury-particle').forEach(p => {
                        if (Math.random() > 0.3) p.style.display = 'none';
                    });
                }
            });
        }

        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            const animatedElements = document.querySelectorAll('.luxury-particle, .morphing-background, .floating-luxury');
            animatedElements.forEach(el => {
                el.style.animationPlayState = document.hidden ? 'paused' : 'running';
            });
        });
    }

    // Helper Methods
    createSparkleEffect(element) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            element.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }

    createGlowEffect(element) {
        element.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.6)';
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 300);
    }

    recalculateParallaxDimensions() {
        // Recalculate parallax parameters on resize
        console.log('Recalculating parallax dimensions...');
        this.initMegaParallaxSystem();
    }

    // Public Methods for external control
    enableMegaParallax() {
        this.megaParallaxEnabled = true;
        console.log('Mega Parallax enabled');
    }

    disableMegaParallax() {
        this.megaParallaxEnabled = false;
        console.log('Mega Parallax disabled');
    }

    togglePerformanceMode() {
        this.performanceMode = !this.performanceMode;
        console.log('Performance mode:', this.performanceMode ? 'enabled' : 'disabled');
    }
}

// Performance Optimierungen
class PerformanceOptimizer {
    constructor() {
        this.initLazyLoading();
        this.initScrollThrottling();
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    initScrollThrottling() {
        let ticking = false;
        
        function updateScrollDependentElements() {
            // Scroll-abhängige Updates hier
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollDependentElements);
                ticking = true;
            }
        });
    }
}

// Audio Effekte (optional)
class AudioEffects {
    constructor() {
        this.sounds = {};
        this.loadSounds();
    }

    loadSounds() {
        // Subtle hover sounds für Premium Erfahrung
        // Implementierung würde echte Audio-Dateien benötigen
        console.log('Audio effects initialized (placeholder)');
    }

    playHoverSound() {
        // Würde einen subtilen Hover-Sound abspielen
        console.log('Hover sound played');
    }

    playClickSound() {
        // Würde einen eleganten Click-Sound abspielen
        console.log('Click sound played');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Initializing Luxury Barbershop Experience...');
    
    const luxuryBarberShop = new LuxuryBarberShop();
    const performanceOptimizer = new PerformanceOptimizer();
    const audioEffects = new AudioEffects();
    
    // Make instances globally available for debugging
    window.luxuryBarberShop = luxuryBarberShop;
    window.performanceOptimizer = performanceOptimizer;
    window.audioEffects = audioEffects;
    
    console.log('✨ Luxury Barbershop Experience loaded successfully!');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Luxury Effects Error:', e.error);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LuxuryBarberShop, PerformanceOptimizer, AudioEffects };
}
