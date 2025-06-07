/**
 * PREMIUM BARBERSHOP - CLEAN & ELEGANT VERSION
 * Beautiful effects without overwhelming complexity
 */

class PremiumBarberShop {
    constructor() {
        this.scrollPosition = 0;
        this.init();
    }

    init() {
        this.initNavigation();
        this.initSmoothScrolling();
        this.initParallaxEffects();
        this.initScrollAnimations();
        this.initCardEffects();
        this.initLoadingScreen();
    }

    // Smooth Loading Screen
    initLoadingScreen() {
        const loader = document.createElement('div');
        loader.className = 'premium-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="barber-icon">💈</div>
                <div class="loader-text">Barbershop BS</div>
                <div class="loader-bar">
                    <div class="loader-progress"></div>
                </div>
            </div>
        `;
        document.body.appendChild(loader);

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                    this.startAnimations();
                }, 500);
            }, 1000);
        });
    }

    // Start entry animations
    startAnimations() {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('aos-animate');
            }, index * 100);
        });
    }

    // Clean Navigation
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');

        // Scroll effect for navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });

        // Mobile menu toggle
        if (mobileMenu) {
            mobileMenu.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });
        }

        // Smooth scroll for nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                // Close mobile menu
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling
    initSmoothScrolling() {
        // Add smooth scrolling to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Elegant Parallax Effects
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Scroll-triggered animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right').forEach(el => {
            observer.observe(el);
        });
    }

    // Elegant card hover effects
    initCardEffects() {
        const cards = document.querySelectorAll('.service-card, .gallery-item, .team-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Initializing Premium Barbershop...');
    new PremiumBarberShop();
    console.log('✨ Premium Barbershop loaded successfully!');
});
