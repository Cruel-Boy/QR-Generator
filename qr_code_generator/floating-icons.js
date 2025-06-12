document.addEventListener('DOMContentLoaded', function() {
    const adContainer = document.querySelector('.ad-container');
    const iconsContainer = adContainer.querySelector('.floating-icons');
    const ICON_COUNT = 8;
    const SPEED = 1;
    const REPEL_DISTANCE = 50;
    
    function createIcon(index) {
        const icon = document.createElement('div');
        const angle = Math.random() * Math.PI * 2;
        
        icon.className = `floating-icon ${index % 2 === 0 ? 'plus' : 'minus'}`;
        icon.style.left = Math.random() * 100 + '%';
        icon.style.top = Math.random() * 100 + '%';
        icon.dataset.dx = Math.cos(angle);
        icon.dataset.dy = Math.sin(angle);
        
        return icon;
    }
    
    // Создаем иконки
    Array.from({ length: ICON_COUNT }).forEach((_, i) => {
        iconsContainer.appendChild(createIcon(i));
    });
    
    function updateIconPosition(icon, icons) {
        const rect = icon.getBoundingClientRect();
        let [dx, dy] = [parseFloat(icon.dataset.dx), parseFloat(icon.dataset.dy)];
        
        // Отталкивание от других иконок
        icons.forEach(otherIcon => {
            if (icon === otherIcon) return;
            
            const otherRect = otherIcon.getBoundingClientRect();
            const distance = Math.hypot(
                rect.left - otherRect.left,
                rect.top - otherRect.top
            );
            
            if (distance < REPEL_DISTANCE) {
                const angle = Math.atan2(
                    rect.top - otherRect.top,
                    rect.left - otherRect.left
                );
                dx += Math.cos(angle) * 0.1;
                dy += Math.sin(angle) * 0.1;
            }
        });
        
        // Обновляем позицию
        let left = parseFloat(icon.style.left) + dx * SPEED;
        let top = parseFloat(icon.style.top) + dy * SPEED;
        
        // Отражение от границ
        if (left < 0 || left > 100) dx = -dx;
        if (top < 0 || top > 100) dy = -dy;
        
        // Сохраняем новое направление
        icon.dataset.dx = dx;
        icon.dataset.dy = dy;
        
        // Применяем новую позицию
        icon.style.left = Math.max(0, Math.min(100, left)) + '%';
        icon.style.top = Math.max(0, Math.min(100, top)) + '%';
    }
    
    function updateIconPositions() {
        const icons = [...iconsContainer.querySelectorAll('.floating-icon')];
        icons.forEach(icon => updateIconPosition(icon, icons));
        requestAnimationFrame(updateIconPositions);
    }
    
    updateIconPositions();
}); 