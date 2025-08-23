document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});

// Gallary
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all galleries
    initializeGallery('gallery1');
    initializeGallery('gallery2');
    initializeGallery('gallery3');
    
    function initializeGallery(galleryId) {
        const gallery = document.getElementById(galleryId);
        const gallerySlider = gallery.querySelector('.gallery-slider');
        const gallerySlides = gallery.querySelectorAll('.gallery-slide');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        
        let currentIndex = 0;
        let autoPlayInterval;
        
        // Calculate how many items to show based on screen width
        function getVisibleItems() {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 900) return 2;
            return 3;
        }
        
        // Update gallery based on current index
        function updateGallery() {
            const visibleItems = getVisibleItems();
            const itemWidth = 100 / visibleItems;
            const translateX = -currentIndex * itemWidth;
            
            gallerySlider.style.transform = `translateX(${translateX}%)`;
        }
        
        // Navigate to next set of images
        function nextSlide() {
            const visibleItems = getVisibleItems();
            if (currentIndex < gallerySlides.length - visibleItems) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateGallery();
        }
        
        // Navigate to previous set of images
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                const visibleItems = getVisibleItems();
                currentIndex = gallerySlides.length - visibleItems; // Loop to end
            }
            updateGallery();
        }
        
        // Start auto-play
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 4000);
        }
        
        // Initialize gallery
        updateGallery();
        startAutoPlay();
        
        // Event listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            // Reset the interval when manually navigating
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 4000);
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            // Reset the interval when manually navigating
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 4000);
        });
        
        // Pause on hover
        gallery.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        // Resume when mouse leaves
        gallery.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 4000);
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            updateGallery();
        });
    }
});
