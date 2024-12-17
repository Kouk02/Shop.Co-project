// new-arrivals-slider.js
document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth <= 767) {
        const slider = document.querySelector('.list-product-new-arrivals');
        const itemWidth = slider.querySelector('.item-list-new-arrivals').offsetWidth;
        let startX = 0;
        let currentPosition = 0;
        let isDragging = false;
        const totalItems = slider.children.length;

        // Touch Start
        slider.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
            slider.style.transition = 'none';
        });

        // Touch Move
        slider.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            
            // Обмеження руху
            const maxMove = (totalItems - 1) * itemWidth;
            currentPosition -= diff;
            currentPosition = Math.max(-maxMove, Math.min(0, currentPosition));
            
            slider.style.transform = `translateX(${currentPosition}px)`;
            startX = currentX;
        });

        // Touch End
        slider.addEventListener('touchend', function() {
            isDragging = false;
            slider.style.transition = 'transform 0.3s ease';
            
            // Snap to nearest item
            const closestItemIndex = Math.round(Math.abs(currentPosition) / itemWidth);
            currentPosition = -closestItemIndex * itemWidth;
            
            slider.style.transform = `translateX(${currentPosition}px)`;
        });
    }
});

// Resize handler
window.addEventListener('resize', function() {
    const sliderContainer = document.querySelector('.list-product-new-arrivals');
    if (window.innerWidth <= 767) {
        sliderContainer.style.transform = 'translateX(0)';
    } else {
        sliderContainer.style.transform = '';
    }
});