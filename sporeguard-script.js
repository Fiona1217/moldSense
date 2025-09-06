// SporeGuard JavaScript - Interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    initFAQAccordion();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Intersection Observer for animations
    initScrollAnimations();
    
    // Button click handlers
    initButtonHandlers();
});

// FAQ Accordion
function initFAQAccordion() {
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const faqIndex = this.getAttribute('data-faq');
            const content = document.querySelector(`[data-faq-content="${faqIndex}"]`);
            const icon = this.querySelector('.faq-icon');
            
            // Close all other FAQ items
            faqTriggers.forEach(otherTrigger => {
                if (otherTrigger !== this) {
                    otherTrigger.classList.remove('active');
                    const otherIndex = otherTrigger.getAttribute('data-faq');
                    const otherContent = document.querySelector(`[data-faq-content="${otherIndex}"]`);
                    const otherIcon = otherTrigger.querySelector('.faq-icon');
                    
                    otherContent.classList.remove('active');
                    otherIcon.textContent = '+';
                }
            });
            
            // Toggle current FAQ item
            const isActive = this.classList.contains('active');
            
            if (isActive) {
                this.classList.remove('active');
                content.classList.remove('active');
                icon.textContent = '+';
            } else {
                this.classList.add('active');
                content.classList.add('active');
                icon.textContent = '−';
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.problem-item, .step-item, .testimonial-card, .faq-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Button click handlers
function initButtonHandlers() {
    const ctaButtons = document.querySelectorAll('.btn-hero');
    const secondaryButtons = document.querySelectorAll('.btn-secondary');
    const contactLinks = document.querySelectorAll('.contact-link');
    
    // CTA button handlers (Pre-order/Get Started)
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add your pre-order logic here
            alert('Pre-order functionality would be implemented here. Redirecting to checkout...');
            // Example: window.location.href = '/checkout';
        });
    });
    
    // Secondary button handlers (Learn More/Join Waitlist)
    secondaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('learn more')) {
                // Scroll to problem section
                const problemSection = document.querySelector('.problem-section');
                if (problemSection) {
                    problemSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (buttonText.includes('waitlist')) {
                // Add waitlist logic here
                alert('Waitlist signup functionality would be implemented here.');
                // Example: showWaitlistModal();
            }
        });
    });
    
    // Contact link handlers
    contactLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add contact functionality here
            alert('Contact form or chat widget would open here.');
            // Example: openContactModal();
        });
    });
}

// Phone image hover effect
function initPhoneHoverEffect() {
    const phoneImage = document.querySelector('.phone-image');
    
    if (phoneImage) {
        phoneImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        phoneImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

// Utility function to add staggered animations
function staggerAnimation(elements, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-fade-in');
        }, index * delay);
    });
}

// Form validation helper (if you add forms later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll-based header behavior (if you add a header later)
function initScrollHeader() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Mobile menu toggle (if you add navigation later)
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuButton.classList.remove('active');
        }
    });
}

// Analytics tracking helper (replace with your analytics solution)
function trackEvent(eventName, properties = {}) {
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Example: Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }
    
    console.log('Event tracked:', eventName, properties);
}

// Add event tracking to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-hero')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent,
            page_section: e.target.closest('section').className
        });
    }
    
    if (e.target.classList.contains('faq-trigger')) {
        trackEvent('faq_click', {
            question: e.target.textContent
        });
    }
});

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        // This would require the web-vitals library
        // You can add it with: <script src="https://unpkg.com/web-vitals"></script>
        
        /*
        import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';
        
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
        */
    }
}

// Initialize all functionality
initPhoneHoverEffect();
// initScrollHeader(); // Uncomment if you add a header
// initMobileMenu(); // Uncomment if you add mobile navigation
// initPerformanceMonitoring(); // Uncomment for performance monitoring