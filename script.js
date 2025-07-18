// Austin HSDA Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
    
    // Newsletter subscription
    const subscribeButton = document.querySelector('button[type="button"]');
    const emailInput = document.querySelector('input[type="email"]');
    
    if (subscribeButton && emailInput) {
        subscribeButton.addEventListener('click', function() {
            const email = emailInput.value.trim();
            
            if (email === '') {
                showAlert('Please enter your email address.', 'warning');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address.', 'warning');
                return;
            }
            
            // Simulate subscription process
            subscribeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            subscribeButton.disabled = true;
            
            setTimeout(() => {
                showAlert('Thank you for subscribing! You\'ll receive our next newsletter soon.', 'success');
                emailInput.value = '';
                subscribeButton.innerHTML = 'Subscribe';
                subscribeButton.disabled = false;
            }, 1500);
        });
        
        // Allow Enter key to submit
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeButton.click();
            }
        });
    }
    
    // Card hover effects for accessibility
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Keyboard navigation support
        card.addEventListener('focus', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Officer card interactions
    const officerCards = document.querySelectorAll('#officers .card');
    officerCards.forEach(card => {
        card.addEventListener('click', function() {
            const officerName = this.querySelector('h5').textContent;
            const officerRole = this.querySelector('h4').textContent;
            showAlert(`Contact ${officerName} (${officerRole}) at austin@hsdatx.org`, 'info');
        });
    });
    
    // Opportunity card interactions
    const opportunityCards = document.querySelectorAll('#opportunities .card');
    opportunityCards.forEach(card => {
        const button = card.querySelector('.btn');
        if (!button) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                const eventTitle = this.querySelector('h4').textContent;
                showAlert(`For more information about "${eventTitle}", please contact us at austin@hsdatx.org`, 'info');
            });
        }
    });
    
    // Social media link tracking (for analytics)
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.textContent.trim();
            showAlert(`${platform} page will open soon. Follow us for the latest updates!`, 'info');
        });
    });
    
    // Google Slides section interactions
    const slidesButtons = document.querySelectorAll('#slides .btn');
    slidesButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const slideType = this.closest('.card').querySelector('h4').textContent;
            showAlert(`${slideType} are publicly available! Links will be added soon. Check back or contact us for updates.`, 'success');
        });
    });
    
    // Back to top functionality
    function createBackToTopButton() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTopBtn.className = 'btn btn-primary back-to-top';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: none;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        `;
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(backToTopBtn);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
    }
    
    createBackToTopButton();
    
    // Utility Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showAlert(message, type = 'info') {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show custom-alert`;
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1050;
            min-width: 300px;
            max-width: 500px;
        `;
        
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for animation
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Meeting reminder functionality

    
    // Accessibility improvements
    function improveAccessibility() {
        // Add skip navigation link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only sr-only-focusable btn btn-primary';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            z-index: 1100;
            padding: 8px 16px;
        `;
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content landmark
        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.setAttribute('id', 'main-content');
            heroSection.setAttribute('tabindex', '-1');
        }
        
        // Improve button accessibility
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach(button => {
            if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
                const icon = button.querySelector('i');
                if (icon) {
                    const iconClasses = icon.className;
                    if (iconClasses.includes('fa-envelope')) {
                        button.setAttribute('aria-label', 'Contact us via email');
                    } else if (iconClasses.includes('fa-chevron-up')) {
                        button.setAttribute('aria-label', 'Back to top');
                    }
                }
            }
        });
    }
    
    improveAccessibility();
    
    // Print functionality removed per user request
    
    console.log('Austin HSDA website loaded successfully!');
});
