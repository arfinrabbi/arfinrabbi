// Simple smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(42, 42, 60, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
    }
});

// Template interaction
document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Buy Now button interaction
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('Buy Now')) {
            e.preventDefault();
            const templateName = this.closest('.template-card').querySelector('h3').textContent;
            alert(`Thank you for your interest in ${templateName}! You will be redirected to the checkout page.`);
            // In a real implementation, you would redirect to payment page
        }
    });
});

// Live Demo button interaction
document.querySelectorAll('.btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('Live Demo')) {
            e.preventDefault();
            const templateName = this.closest('.template-card').querySelector('h3').textContent;
            alert(`Opening live demo for ${templateName} in a new tab.`);
            // In a real implementation, you would open the demo URL
        }
    });
});

// Service package selection
document.querySelectorAll('.service-card .btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const serviceName = this.closest('.service-card').querySelector('h3').textContent;
        const servicePrice = this.closest('.service-card').querySelector('.price').textContent;
        
        alert(`You've selected: ${serviceName}\nPrice: ${servicePrice}\n\nA contact form will open to discuss your project requirements.`);
        // In a real implementation, you would open a contact form/modal
    });
});

// Add loading animation for page elements
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.template-card, .feature-card, .service-card');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});
