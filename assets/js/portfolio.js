document.addEventListener('DOMContentLoaded', function() {
    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.classList.toggle('active', button.getAttribute('href') === currentPage);
    });
    
    // Update copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
