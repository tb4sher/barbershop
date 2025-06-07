// Premium Barbershop JavaScript - Clean & Elegant Version
class PremiumBarberShop {
    constructor() {
        this.isScrolling = false;
        this.scrollThreshold = 16; // 60fps
        this.lastScrollTime = 0;
        
        this.init();
    }

    init() {
        this.handleLoading();
        this.initNavigation();
        this.initParallax();
        this.initScrollProgress();
        this.initCounters();
        this.initForm();
        this.initCursor();
        
        // Performance optimization for mobile
        this.checkPerformance();
    }    // Loading Screen
    handleLoading() {
        window.addEventListener('load', () => {
            const loadingScreen = document.getElementById('loading-screen');
            
            // Hide loading screen with fade effect
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500);
        });
    }

    // Navigation
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');

        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            this.toggleMobileMenu(mobileMenu);
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu
                navMenu.classList.remove('active');
                this.resetMobileMenu(mobileMenu);
            });
        });
    }

    toggleMobileMenu(menuButton) {
        const lines = menuButton.querySelectorAll('.hamburger-line');
        menuButton.classList.toggle('active');
        
        if (menuButton.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            this.resetMobileMenu(menuButton);
        }
    }

    resetMobileMenu(menuButton) {
        const lines = menuButton.querySelectorAll('.hamburger-line');
        menuButton.classList.remove('active');
        lines[0].style.transform = '';
        lines[1].style.opacity = '';
        lines[2].style.transform = '';
    }

    // Clean Parallax System
    initParallax() {
        const parallaxElements = document.querySelectorAll('[data-speed]');
        
        if (parallaxElements.length === 0) return;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.speed);
                const yPos = -(scrolled * speed);
                const rect = element.getBoundingClientRect();
                
                // Only animate visible elements
                if (rect.bottom >= 0 && rect.top <= windowHeight) {
                    if (element.classList.contains('parallax-bg')) {
                        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    } else if (element.classList.contains('floating-element')) {
                        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    } else {
                        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    }
                }
            });
        };

        // Throttled scroll event
        window.addEventListener('scroll', () => {
            const now = Date.now();
            if (now - this.lastScrollTime > this.scrollThreshold) {
                if (!this.isScrolling) {
                    requestAnimationFrame(updateParallax);
                    this.isScrolling = true;
                }
                this.lastScrollTime = now;
            }
        });

        // Reset scrolling flag
        window.addEventListener('scroll', () => {
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.isScrolling = false;
            }, 100);
        });
    }    // Scroll Progress
    initScrollProgress() {
        const progressBar = document.getElementById('scroll-progress-bar');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxHeight) * 100;
            
            if (progressBar) {
                progressBar.style.width = `${Math.min(progress, 100)}%`;
            }
        });
    }

    // Counter Animation
    initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const options = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const start = performance.now();
        const startValue = 0;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(startValue + (target - startValue) * easeOutQuart);
            
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(updateCounter);
    }

    // Form Handling
    initForm() {
        const form = document.getElementById('booking-form');
        
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });

        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    }

    handleFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Show success message
            this.showNotification('Termin erfolgreich gebucht! Wir melden uns in Kürze bei Ihnen.', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #007bff, #6f42c1)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Custom Cursor (Desktop only)
    initCursor() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '0.7';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0.7';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        // Hover effects
        document.querySelectorAll('a, button, .service-card, .gallery-item').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.background = 'rgba(212, 175, 55, 0.3)';
            });

            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'var(--primary-gold)';
            });
        });
    }

    // Performance Check
    checkPerformance() {
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency <= 2) {
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
        }

        // Disable parallax on mobile for better performance
        if (window.innerWidth <= 768) {
            document.querySelectorAll('[data-speed]').forEach(element => {
                element.removeAttribute('data-speed');
            });
        }

        // Battery API check
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2) {
                    // Reduce animations when battery is low
                    document.documentElement.style.setProperty('--animation-duration', '0.1s');
                }
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PremiumBarberShop();
});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
