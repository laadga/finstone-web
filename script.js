// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const modal = document.getElementById('contact-modal');
const modalClose = document.getElementById('modal-close');
const contactForm = document.getElementById('contact-form');

// Header scroll effect
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Mobile navigation toggle
function toggleMobileNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// Close mobile nav when clicking a link
function closeMobileNav() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// Smooth scroll to section
function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Handle navigation clicks
function handleNavClick(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    
    // Handle modal links
    if (href === '#contact') {
        showModal();
        return;
    }
    
    // Handle regular navigation
    if (href.startsWith('#')) {
        smoothScrollTo(href);
        closeMobileNav();
    }
}

// Modal functions
function showModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    const firstInput = modal.querySelector('input[type="text"]');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

function hideModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Handle contact form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'company', 'title'];
    const missingFields = requiredFields.filter(field => !data[field]?.trim());
    
    if (missingFields.length > 0) {
        alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your interest! We\'ll contact you within 2 hours to discuss your AI audit.');
        contactForm.reset();
        hideModal();
        
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1500);
}

// Handle CTA button clicks
function handleCtaClick(e) {
    const href = this.getAttribute('href');
    
    if (href === '#contact' || href === '#book-audit') {
        e.preventDefault();
        showModal();
    }
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .credibility-card,
        .pain-card,
        .deliverable-item,
        .timeline-item,
        .benefit-card
    `);
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Handle keyboard navigation
function handleKeyboardNav(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        hideModal();
    }
    
    // Close mobile nav with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileNav();
    }
}

// Optimize scroll performance
let ticking = false;
function optimizedScrollHandler() {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
}

// Initialize preloader (if needed)
function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 300);
    }
}

// Handle resize events
function handleResize() {
    // Close mobile nav on resize to desktop
    if (window.innerWidth > 768) {
        closeMobileNav();
    }
}

// Add loading state to external links
function addLoadingToExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 2000);
        });
    });
}

// Performance monitoring
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
            }, 0);
        });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Navigation events
    navToggle.addEventListener('click', toggleMobileNav);
    
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Modal events
    modalClose.addEventListener('click', hideModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
    
    // Form events
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // CTA button events
    const ctaButtons = document.querySelectorAll('a[href="#contact"], a[href="#book-audit"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', handleCtaClick);
    });
    
    // Scroll events
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    
    // Resize events
    window.addEventListener('resize', handleResize);
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyboardNav);
    
    // Initialize features
    initScrollAnimations();
    addLoadingToExternalLinks();
    logPerformanceMetrics();
    
    // Remove preloader when everything is loaded
    window.addEventListener('load', hidePreloader);
});

// Additional utility functions

// Debounce function for performance
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

// Throttle function for scroll events
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
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll percentage
function getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
}

// Animate counter numbers
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize counter animations when visible
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = entry.target;
                const value = target.textContent.replace(/[^0-9]/g, '');
                const numValue = parseInt(value) || 0;
                
                target.classList.add('animated');
                target.textContent = '0';
                animateCounter(target, 0, numValue, 2000);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Call counter animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initCounterAnimations, 500);
});

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showModal,
        hideModal,
        smoothScrollTo,
        debounce,
        throttle,
        isInViewport,
        getScrollPercentage
    };
}


