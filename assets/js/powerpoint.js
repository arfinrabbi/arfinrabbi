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
        let currentPosition = 0;
        let autoScrollInterval;
        let slidesToShow = 3;
        
        // Function to calculate slide width
        function calculateSlideWidth() {
            if (window.innerWidth < 768) {
                slidesToShow = 1;
            } else if (window.innerWidth < 992) {
                slidesToShow = 2;
            } else {
                slidesToShow = 3;
            }
            
            // Update slide widths for responsive design
            const slideWidthPercentage = 100 / slidesToShow;
            slides.forEach(slide => {
                slide.style.flex = `0 0 ${slideWidthPercentage}%`;
            });
            
            // Return the actual pixel width of a single slide
            return track.offsetWidth / slidesToShow;
        }
        
        let slideWidth = calculateSlideWidth();
        let maxPosition = -((slides.length / 2 - slidesToShow) * slideWidth);
        
        // Set up event listeners for navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPosition < 0) {
                    currentPosition += slideWidth;
                    track.style.transform = `translateX(${currentPosition}px)`;
                    resetAutoScroll();
                } else {
                    // If at the beginning, loop to the end
                    currentPosition = maxPosition;
                    track.style.transform = `translateX(${currentPosition}px)`;
                    resetAutoScroll();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPosition > maxPosition) {
                    currentPosition -= slideWidth;
                    track.style.transform = `translateX(${currentPosition}px)`;
                    resetAutoScroll();
                } else {
                    // If at the end, loop back to start
                    currentPosition = 0;
                    track.style.transform = `translateX(${currentPosition}px)`;
                    resetAutoScroll();
                }
            });
        }
        
        // Function to start auto-scroll
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                if (currentPosition > maxPosition) {
                    currentPosition -= slideWidth;
                    track.style.transform = `translateX(${currentPosition}px)`;
                } else {
                    // Reset to first slide when reaching the end
                    currentPosition = 0;
                    track.style.transform = `translateX(${currentPosition}px)`;
                }
            }, 5000);
        }
        
        // Function to reset auto-scroll timer
        function resetAutoScroll() {
            clearInterval(autoScrollInterval);
            startAutoScroll();
        }
        
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
                // Recalculate dimensions
                slideWidth = calculateSlideWidth();
                maxPosition = -((slides.length / 2 - slidesToShow) * slideWidth);
                
                // Reset position if needed
                if (currentPosition < maxPosition) {
                    currentPosition = maxPosition;
                }
                
                track.style.transform = `translateX(${currentPosition}px)`;
                resetAutoScroll();
            }, 250);
        });
    });
});
