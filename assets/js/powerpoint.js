document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    
    // Initialize all galleries
    const galleries = document.querySelectorAll('.gallery-container');
    
    galleries.forEach(gallery => {
        const track = gallery.querySelector('.gallery-track');
        const slides = gallery.querySelectorAll('.gallery-slide');
        const navContainer = gallery.closest('.gallery-section').querySelector('.gallery-nav');
        
        // Check if navigation elements exist
        if (!navContainer) return;
        
        const prevBtn = navContainer.querySelector('.prev-arrow');
        const nextBtn = navContainer.querySelector('.next-arrow');
        
        // Initialize variables
        let currentSlide = 0;
        let autoScrollInterval;
        let slidesToShow = 3;
        
        // Function to calculate how many slides to show
        function calculateSlidesToShow() {
            if (window.innerWidth < 768) {
                return 1;
            } else if (window.innerWidth < 992) {
                return 2;
            } else {
                return 3;
            }
        }
        
        // Function to update the gallery
        function updateGallery() {
            slidesToShow = calculateSlidesToShow();
            const slideWidth = 100 / slidesToShow;
            
            // Set slide widths
            slides.forEach(slide => {
                slide.style.flex = `0 0 ${slideWidth}%`;
            });
            
            // Move to the correct position
            moveToSlide(currentSlide);
        }
        
        // Function to move to a specific slide
        function moveToSlide(index) {
            // Ensure index is within bounds
            const maxSlideIndex = Math.max(0, slides.length - slidesToShow);
            currentSlide = Math.max(0, Math.min(index, maxSlideIndex));
            
            // Calculate the translateX value
            const translateXValue = -(currentSlide * (100 / slidesToShow));
            track.style.transform = `translateX(${translateXValue}%)`;
        }
        
        // Set up event listeners for navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                moveToSlide(currentSlide - 1);
                resetAutoScroll();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                moveToSlide(currentSlide + 1);
                resetAutoScroll();
            });
        }
        
        // Function to start auto-scroll
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                const maxSlideIndex = Math.max(0, slides.length - slidesToShow);
                
                if (currentSlide < maxSlideIndex) {
                    moveToSlide(currentSlide + 1);
                } else {
                    // Reset to first slide when reaching the end
                    moveToSlide(0);
                }
            }, 5000);
        }
        
        // Function to reset auto-scroll timer
        function resetAutoScroll() {
            clearInterval(autoScrollInterval);
            startAutoScroll();
        }
        
        // Initialize the gallery
        updateGallery();
        
        // Start auto-scroll initially
        startAutoScroll();
        
        // Pause auto-scroll on hover
        gallery.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        gallery.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            clearInterval(autoScrollInterval);
            
            resizeTimer = setTimeout(() => {
                // Store the current slide before updating
                const oldCurrentSlide = currentSlide;
                
                // Update the gallery
                updateGallery();
                
                // Adjust current slide if needed after resize
                const maxSlideIndex = Math.max(0, slides.length - slidesToShow);
                if (oldCurrentSlide > maxSlideIndex) {
                    currentSlide = maxSlideIndex;
                }
                
                // Move to the correct slide
                moveToSlide(currentSlide);
                
                // Restart auto-scroll
                startAutoScroll();
            }, 250);
        });
    });
});
