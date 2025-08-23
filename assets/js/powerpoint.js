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
        const images = gallery.querySelectorAll('.gallery-img');
        
        let currentIndex = 0;
        let autoPlayInterval = null;
        let isTransitioning = false;
        
        // Preload images for better performance
        preloadImages(images);
        
        // Calculate how many items to show based on screen width
        function getVisibleItems() {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 900) return 2;
            return 3;
        }
        
        // Update gallery based on current index
        function updateGallery() {
            if (isTransitioning) return;
            
            isTransitioning = true;
            const visibleItems = getVisibleItems();
            const itemWidth = 100 / visibleItems;
            const translateX = -currentIndex * itemWidth;
            
            gallerySlider.style.transform = `translateX(${translateX}%)`;
            
            // Reset the transitioning flag after the transition completes
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
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
        
        // Start auto-play with requestAnimationFrame for smoother animation
        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            
            autoPlayInterval = setInterval(() => {
                if (!document.hidden) {
                    nextSlide();
                }
            }, 4000);
        }
        
        // Preload images for better performance
        function preloadImages(images) {
            images.forEach(img => {
                if (img.complete) {
                    img.classList.add('loaded');
                } else {
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });
                    img.addEventListener('error', () => {
                        // Handle error if image fails to load
                        console.error('Image failed to load:', img.src);
                    });
                }
            });
        }
        
        // Initialize gallery
        updateGallery();
        startAutoPlay();
        
        // Event listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            // Reset the interval when manually navigating
            startAutoPlay();
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            // Reset the interval when manually navigating
            startAutoPlay();
        });
        
        // Pause on hover
        gallery.addEventListener('mouseenter', () => {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
        });
        
        // Resume when mouse leaves
        gallery.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
        
        // Handle window resize with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateGallery();
            }, 250);
        });
        
        // Pause auto-play when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (autoPlayInterval) clearInterval(autoPlayInterval);
            } else {
                startAutoPlay();
            }
        });
    }
});
