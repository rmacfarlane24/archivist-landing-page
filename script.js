// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth Scrolling for Navigation Links
    const navLinksAll = document.querySelectorAll('a[href^="#"]');
    
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.loss-card, .benefit-card, .process-step, .pricing-card, .testimonial-card');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Feature tabs interaction
    const featureTabs = document.querySelectorAll('.tab');
    const featureContent = document.querySelector('.feature-content');
    
    featureTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            featureTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update content based on tab (you can expand this)
            const tabName = this.textContent.toLowerCase();
            updateFeatureContent(tabName);
        });
    });

    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('lifetime')) {
                this.style.transform = 'scale(1.05) translateY(-10px)';
            } else {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('lifetime')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = '';
            }
        });
    });

    // Lifetime deal countdown timer (optional)
    const lifetimeBadge = document.querySelector('.lifetime-badge');
    if (lifetimeBadge) {
        // Add a subtle animation to draw attention
        setInterval(() => {
            lifetimeBadge.style.transform = 'translateX(-50%) scale(1.05)';
            setTimeout(() => {
                lifetimeBadge.style.transform = 'translateX(-50%) scale(1)';
            }, 200);
        }, 5000);
    }

    // Currency detection and display (optional enhancement)
    function detectUserCurrency() {
        // This is a simple implementation - you might want to use a more sophisticated approach
        const userLanguage = navigator.language || navigator.userLanguage;
        const userCountry = navigator.geolocation ? 'auto' : 'GB'; // Default to GB
        
        if (userLanguage.includes('en-US') || userCountry === 'US') {
            return 'USD';
        } else if (userLanguage.includes('de') || userLanguage.includes('fr') || userLanguage.includes('es')) {
            return 'EUR';
        } else {
            return 'GBP';
        }
    }

    // Update pricing display based on user's region (optional)
    function updatePricingDisplay() {
        const userCurrency = detectUserCurrency();
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        pricingCards.forEach(card => {
            const priceElement = card.querySelector('.price');
            const equivalents = card.querySelectorAll('.equivalent');
            
            if (userCurrency === 'USD') {
                // Show USD prices more prominently
                equivalents.forEach(equiv => {
                    if (equiv.textContent.includes('USD')) {
                        equiv.style.color = '#00ff88';
                        equiv.style.fontWeight = '600';
                    }
                });
            } else if (userCurrency === 'EUR') {
                // Show EUR prices more prominently
                equivalents.forEach(equiv => {
                    if (equiv.textContent.includes('EUR')) {
                        equiv.style.color = '#00ff88';
                        equiv.style.fontWeight = '600';
                    }
                });
            }
        });
    }

    // Call the pricing display update
    updatePricingDisplay();

    // Trust logos animation
    const trustItems = document.querySelectorAll('.trust-item');
    
    trustItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('fade-in-up');
    });

    // Hero CTA button pulse effect
    const heroCta = document.querySelector('.hero .cta-primary');
    if (heroCta) {
        setInterval(() => {
            heroCta.classList.add('pulse');
            setTimeout(() => {
                heroCta.classList.remove('pulse');
            }, 1000);
        }, 3000);
    }

    // Search bar interaction in mockup
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.borderColor = '#00ff88';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.borderColor = '';
        });
    }

    // File list hover effects
    const fileItems = document.querySelectorAll('.file-item');
    
    fileItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 255, 136, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });

    // Email Modal Functionality
    const modal = document.getElementById('emailModal');
    const openModalButtons = document.querySelectorAll('#openModal');
    const closeModalButton = document.getElementById('closeModal');
    const emailForm = document.getElementById('emailForm');

    // Open modal when any "Start Free Trial" button is clicked
    openModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close modal when X button is clicked
    closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle form submission
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        
        if (email) {
            // Here you would typically send the email to your server
            // For now, we'll show a success message
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: #00ff88; margin-bottom: 1rem;"></i>
                    <h3 style="color: #ffffff; margin-bottom: 1rem;">Check Your Email!</h3>
                    <p style="color: #cccccc; margin-bottom: 1rem;">We've sent the download link to <strong>${email}</strong></p>
                    <p style="color: #888; font-size: 0.9rem;">If you don't see it, check your spam folder.</p>
                    <button class="cta-primary" onclick="closeModal()" style="margin-top: 1rem;">Close</button>
                </div>
            `;
        }
    });

    // Function to close modal (for the success message)
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Reset the form for next time
        setTimeout(() => {
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <p>Enter your email address and we'll send you the download link for your 14-day free trial.</p>
                <form id="emailForm" class="email-form">
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="your@email.com" required>
                    </div>
                    <button type="submit" class="cta-primary">Send Download Link</button>
                </form>
                <p class="form-note">We'll email you the download link immediately. No spam, unsubscribe anytime.</p>
            `;
            // Re-attach the form event listener
            document.getElementById('emailForm').addEventListener('submit', arguments.callee);
        }, 100);
    }
});

// Update feature content based on selected tab
function updateFeatureContent(tabName) {
    const featureContent = document.querySelector('.feature-content');
    
    // You can expand this function to show different content for each tab
    const contentMap = {
        'search': `
            <div class="search-results">
                <div class="result-item">
                    <i class="fas fa-file-pdf"></i>
                    <div class="result-info">
                        <span class="result-name">project_document.pdf</span>
                        <span class="result-path">/Documents/Projects/2024/</span>
                    </div>
                </div>
                <div class="result-item">
                    <i class="fas fa-image"></i>
                    <div class="result-info">
                        <span class="result-name">vacation_photos.jpg</span>
                        <span class="result-path">/Pictures/Vacation/</span>
                    </div>
                </div>
            </div>
        `,
        'analytics': `
            <div class="analytics-content">
                <div class="chart-placeholder">
                    <div class="chart-bar" style="height: 60%;"></div>
                    <div class="chart-bar" style="height: 80%;"></div>
                    <div class="chart-bar" style="height: 40%;"></div>
                    <div class="chart-bar" style="height: 90%;"></div>
                </div>
                <p style="text-align: center; color: #888; margin-top: 1rem;">Storage usage analytics</p>
            </div>
        `,
        'duplicates': `
            <div class="duplicates-content">
                <div class="duplicate-item">
                    <i class="fas fa-file-image"></i>
                    <div class="duplicate-info">
                        <span class="duplicate-name">photo_001.jpg</span>
                        <span class="duplicate-size">2.3 MB (3 copies)</span>
                    </div>
                </div>
                <div class="duplicate-item">
                    <i class="fas fa-file-pdf"></i>
                    <div class="duplicate-info">
                        <span class="duplicate-name">report.pdf</span>
                        <span class="duplicate-size">1.8 MB (2 copies)</span>
                    </div>
                </div>
            </div>
        `
    };
    
    if (contentMap[tabName]) {
        featureContent.innerHTML = contentMap[tabName];
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .pulse {
        animation: pulse 1s ease-in-out;
    }
    
    .navbar.scrolled {
        background: rgba(10, 10, 10, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(10, 10, 10, 0.98);
        padding: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .chart-placeholder {
        display: flex;
        justify-content: center;
        align-items: end;
        gap: 1rem;
        height: 150px;
        margin: 1rem 0;
    }
    
    .chart-bar {
        width: 30px;
        background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
        border-radius: 4px 4px 0 0;
        transition: height 0.3s ease;
    }
    
    .duplicate-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 6px;
        margin-bottom: 0.5rem;
    }
    
    .duplicate-item i {
        color: #00ff88;
        font-size: 1.2rem;
    }
    
    .duplicate-info {
        display: flex;
        flex-direction: column;
    }
    
    .duplicate-name {
        color: #ffffff;
        font-weight: 500;
    }
    
    .duplicate-size {
        color: #888;
        font-size: 0.85rem;
    }
`;

document.head.appendChild(style); 