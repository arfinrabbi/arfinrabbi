document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('scrollContainer');
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');
    let isScrolling = false;
    let scrollTimeout;
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Update navigation dots based on scroll position
    function updateNavigation() {
        const scrollLeft = container.scrollLeft;
        const sectionWidth = window.innerWidth;
        const currentSection = Math.round(scrollLeft / sectionWidth);
        
        navDots.forEach((dot, index) => {
            if (index === currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Scroll to specific section
    function scrollToSection(index) {
        if (isScrolling) return;
        
        isScrolling = true;
        const sectionWidth = window.innerWidth;
        container.scrollTo({
            left: sectionWidth * index,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }
    
    // Handle mouse wheel scrolling
    function handleWheelScroll(e) {
        // Prevent default vertical scrolling
        e.preventDefault();
        
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        
        // Set a timeout to prevent rapid scrolling
        scrollTimeout = setTimeout(() => {
            const delta = Math.sign(e.deltaY);
            const sectionWidth = window.innerWidth;
            const currentSection = Math.round(container.scrollLeft / sectionWidth);
            const maxSection = sections.length - 1;
            
            if (delta > 0 && currentSection < maxSection) {
                // Scroll right
                scrollToSection(currentSection + 1);
            } else if (delta < 0 && currentSection > 0) {
                // Scroll left
                scrollToSection(currentSection - 1);
            }
        }, 100);
    }
    
    // Add click event to navigation dots
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            scrollToSection(index);
        });
    });
    
    // Update navigation on scroll
    container.addEventListener('scroll', updateNavigation);
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        const sectionWidth = window.innerWidth;
        const currentSection = Math.round(container.scrollLeft / sectionWidth);
        
        if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        } else if (e.key === 'ArrowLeft' && currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    });
    
    // Add wheel event listener to the document
    document.addEventListener('wheel', handleWheelScroll, { passive: false });
    
    // Initialize navigation
    updateNavigation();
});
