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
    
    // Create modal for project images (only if portfolio items exist)
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (portfolioItems.length > 0) {
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
        portfolioItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Don't trigger if clicking on links inside the item
                if (e.target.tagName === 'A') return;
                
                const img = this.querySelector('img');
                if (!img) return;
                
                document.getElementById('modal-image').src = img.src;
                document.getElementById('modal-image').alt = img.alt;
                document.querySelector('.image-caption').textContent = 
                    this.querySelector('h3')?.textContent || '';
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent page scrolling
            });
        });
        
        // Close modal handlers
        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        };
        
        document.querySelector('.close-modal').addEventListener('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close modal with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
});
