document.addEventListener('DOMContentLoaded', function() {
    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        const buttonHref = button.getAttribute('href');
        if (buttonHref === currentPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Update copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Create modal for project images
    const modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img id="modal-image" src="" alt="">
            <div class="image-caption"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Portfolio item click handlers
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            const caption = this.querySelector('h3').textContent;
            
            document.getElementById('modal-image').src = imgSrc;
            document.getElementById('modal-image').alt = imgAlt;
            document.querySelector('.image-caption').textContent = caption;
            modal.style.display = 'block';
        });
    });
    
    // Close modal handlers
    document.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
});
