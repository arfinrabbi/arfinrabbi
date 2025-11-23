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
        const scrollTop = container.scrollTop;
        const sectionHeight = window.innerHeight;
        const currentSection = Math.round(scrollTop / sectionHeight);
        
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
        const sectionHeight = window.innerHeight;
        container.scrollTo({
            top: sectionHeight * index,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }
    
    // Handle mouse wheel scrolling
    function handleWheelScroll(e) {
        // Allow default vertical scrolling
        // We don't prevent default for vertical scrolling
        
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        
        // Set a timeout to update navigation after scroll
        scrollTimeout = setTimeout(() => {
            updateNavigation();
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
        const sectionHeight = window.innerHeight;
        const currentSection = Math.round(container.scrollTop / sectionHeight);
        
        if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        } else if (e.key === 'ArrowUp' && currentSection > 0) {
            scrollToSection(currentSection - 1);
        } else if (e.key === ' ' || e.key === 'PageDown') {
            e.preventDefault();
            if (currentSection < sections.length - 1) {
                scrollToSection(currentSection + 1);
            }
        } else if (e.key === 'PageUp') {
            e.preventDefault();
            if (currentSection > 0) {
                scrollToSection(currentSection - 1);
            }
        }
    });
    
    // Add wheel event listener
    container.addEventListener('wheel', handleWheelScroll, { passive: true });
    
    // Touch support for mobile devices
    let startY = 0;
    
    container.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    container.addEventListener('touchend', function(e) {
        if (!e.changedTouches[0]) return;
        
        const endY = e.changedTouches[0].clientY;
        const diffY = startY - endY;
        
        // Only handle significant vertical swipes
        if (Math.abs(diffY) > 50) {
            const sectionHeight = window.innerHeight;
            const currentSection = Math.round(container.scrollTop / sectionHeight);
            
            if (diffY > 0 && currentSection < sections.length - 1) {
                // Swipe up - go to next section
                scrollToSection(currentSection + 1);
            } else if (diffY < 0 && currentSection > 0) {
                // Swipe down - go to previous section
                scrollToSection(currentSection - 1);
            }
        }
    }, { passive: true });
    
    // Initialize navigation
    updateNavigation();
});
