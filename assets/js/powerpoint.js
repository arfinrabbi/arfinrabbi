document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize all galleries
    const galleries = document.querySelectorAll('.gallery-container');
    
    galleries.forEach(gallery => {
        const track = gallery.querySelector('.gallery-track');
        const slides = gallery.querySelectorAll('.gallery-slide');
        const prevBtn = gallery.nextElementSibling.querySelector('.prev-arrow');
        const nextBtn = gallery.nextElementSibling.querySelector('.next-arrow');
        
        let currentPosition = 0;
        const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginRight) * 2;
        const maxPosition = -(slides.length - 3) * slideWidth;
        
        // Set up event listeners for navigation
        prevBtn.addEventListener('click', () => {
            if (currentPosition < 0) {
                currentPosition += slideWidth;
                track.style.transform = `translateX(${currentPosition}px)`;
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentPosition > maxPosition) {
                currentPosition -= slideWidth;
                track.style.transform = `translateX(${currentPosition}px)`;
            }
        });
        
        // Auto-scroll functionality
        let autoScrollInterval = setInterval(() => {
            if (currentPosition > maxPosition) {
                currentPosition -= slideWidth;
                track.style.transform = `translateX(${currentPosition}px)`;
            } else {
                currentPosition = 0;
                track.style.transform = `translateX(${currentPosition}px)`;
            }
        }, 5000);
        
        // Pause auto-scroll on hover
        gallery.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        gallery.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(() => {
                if (currentPosition > maxPosition) {
                    currentPosition -= slideWidth;
                    track.style.transform = `translateX(${currentPosition}px)`;
                } else {
                    currentPosition = 0;
                    track.style.transform = `translateX(${currentPosition}px)`;
                }
            }, 5000);
        });
    });
    
    // Responsive adjustments
    function handleResize() {
        const galleries = document.querySelectorAll('.gallery-container');
        
        galleries.forEach(gallery => {
            const track = gallery.querySelector('.gallery-track');
            const slides = gallery.querySelectorAll('.gallery-slide');
            
            let slidesToShow = 3;
            if (window.innerWidth < 992) slidesToShow = 2;
            if (window.innerWidth < 768) slidesToShow = 1;
            
            const slideWidth = (100 / slidesToShow);
            slides.forEach(slide => {
                slide.style.flex = `0 0 ${slideWidth}%`;
            });
        });
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
});
