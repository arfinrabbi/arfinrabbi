document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    
    // Initialize the carousel
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let itemsToShow = 3;
    let autoPlayInterval;
    
    // Create dots based on number of items
    for (let i = 0; i <= items.length - itemsToShow; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.dot');
    
    // Function to update carousel position
    function updateCarousel() {
        const itemWidth = 100 / itemsToShow;
        const offset = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${offset}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Add animation to the incoming slide
        items.forEach((item, index) => {
            if (index >= currentIndex && index < currentIndex + itemsToShow) {
                item.querySelector('img').classList.add('slide-in');
                setTimeout(() => {
                    item.querySelector('img').classList.remove('slide-in');
                }, 500);
            }
        });
    }
    
    // Function to go to a specific slide
    function goToSlide(index) {
        if (index < 0) {
            index = items.length - itemsToShow;
        } else if (index > items.length - itemsToShow) {
            index = 0;
        }
        
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    }
    
    // Next slide function
    function nextSlide() {
        // Move just one image at a time
        let nextIndex = currentIndex + 1;
        
        // If we're at the end, loop back to the beginning
        if (nextIndex > items.length - itemsToShow) {
            nextIndex = 0;
        }
        
        goToSlide(nextIndex);
    }
    
    // Previous slide function
    function prevSlide() {
        // Move just one image at a time
        let prevIndex = currentIndex - 1;
        
        // If we're at the beginning, loop to the end
        if (prevIndex < 0) {
            prevIndex = items.length - itemsToShow;
        }
        
        goToSlide(prevIndex);
    }
    
    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 3000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // Event listeners for buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
        });
    }
    
    // Pause autoplay when hovering over carousel
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth < 900) {
            itemsToShow = 2;
        } else {
            itemsToShow = 3;
        }
        
        if (window.innerWidth < 600) {
            itemsToShow = 1;
        }
        
        // Recreate dots for new itemsToShow value
        dotsContainer.innerHTML = '';
        for (let i = 0; i <= items.length - itemsToShow; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
        
        // Adjust currentIndex if it's out of bounds
        if (currentIndex > items.length - itemsToShow) {
            currentIndex = Math.max(0, items.length - itemsToShow);
        }
        
        updateCarousel();
    }
    
    // Initialize carousel
    handleResize(); // Set initial itemsToShow
    updateCarousel();
    startAutoPlay();
    
    window.addEventListener('resize', handleResize);
});
