const slider = document.querySelector('.list-product-new-arrivals');
let startX;

// Обробник для початку свайпу
slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

// Обробник для руху пальця
slider.addEventListener('touchmove', (e) => {
  let moveX = e.touches[0].clientX - startX;

  // Якщо рух пальця вліво
  if (moveX > 50) {
    slideLeft();
    startX = e.touches[0].clientX; // оновлення стартової точки
  }
  // Якщо рух пальця вправо
  if (moveX < -50) {
    slideRight();
    startX = e.touches[0].clientX; // оновлення стартової точки
  }
});

// Функція для прокручування вліво
function slideLeft() {
  slider.scrollBy({
    left: 198 + 5, // ширина ячейки + відстань між ячейками
    behavior: 'smooth',
  });
}

// Функція для прокручування вправо
function slideRight() {
  slider.scrollBy({
    left: -(198 + 5), // ширина ячейки + відстань між ячейками
    behavior: 'smooth',
  });
}

// Додаємо адаптивність до екрану
window.addEventListener('resize', () => {
  if (window.innerWidth <= 767) {
    // якщо ширина екрану менше або рівна 767 пікселів
    slider.style.overflowX = 'scroll';
    slider.style.scrollSnapType = 'x mandatory';
  } else {
    // якщо ширина екрану більше 767 пікселів
    slider.style.overflowX = 'hidden';
  }
});

// Початкове встановлення для адаптивності
if (window.innerWidth <= 767) {
  slider.style.overflowX = 'scroll';
  slider.style.scrollSnapType = 'x mandatory';
} else {
  slider.style.overflowX = 'hidden';
}