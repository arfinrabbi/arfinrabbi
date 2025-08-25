// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to portfolio items when they come into view
const portfolioItems = document.querySelectorAll('.portfolio-item');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize portfolio items with opacity 0 and slightly translated
portfolioItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Add hover effect to project buttons
const projectButtons = document.querySelectorAll('.project-button');

projectButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
        button.style.boxShadow = '0 6px 12px rgba(5, 62, 255, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 8px rgba(5, 62, 255, 0.3)';
    });
});

// Make Behance button more interactive
const behanceButton = document.querySelector('.behance-button');

if (behanceButton) {
    behanceButton.addEventListener('mouseenter', () => {
        behanceButton.style.transform = 'translateY(-5px)';
        behanceButton.style.boxShadow = '0 12px 30px rgba(5, 62, 255, 0.5)';
    });
    
    behanceButton.addEventListener('mouseleave', () => {
        behanceButton.style.transform = 'translateY(0)';
        behanceButton.style.boxShadow = '0 6px 20px rgba(5, 62, 255, 0.4)';
    });
}

// Add loading animation for images
const projectImages = document.querySelectorAll('.project-image');

projectImages.forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = 1;
    });
    
    // Set initial opacity to 0 for fade-in effect
    img.style.opacity = 0;
    img.style.transition = 'opacity 0.5s ease';
});
