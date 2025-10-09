// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form modal functionality
const modal = document.getElementById('contact-modal');
const getStartedBtns = document.querySelectorAll('.get-started-btn');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contact-form');

// Open modal when clicking get started buttons
getStartedBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'flex';
    });
});

// Close modal when clicking X
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // In a real application, you would send this data to a server
    // For this example, we'll just show an alert
    alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} regarding ${service}.`);
    
    // Reset form and close modal
    contactForm.reset();
    modal.style.display = 'none';
});

// Minimal header scroll effect
window.addEventListener('scroll', function() {
    const minimalHeader = document.querySelector('.minimal-header');
    if (window.scrollY > 100) {
        minimalHeader.style.padding = '10px 0';
        minimalHeader.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        minimalHeader.style.padding = '15px 0';
        minimalHeader.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});
