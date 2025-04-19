
// Service Worker регистрация
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed: ', error));
  });
}

// Обработка кнопок показа QR-кода
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.show-qr-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const qrContainer = this.nextElementSibling;
      const qrImage = qrContainer.querySelector('.qr');
      const qrPath = this.getAttribute('data-qr');
      
      // Переключаем видимость контейнера
      if (qrContainer.style.display === 'none') {
        qrImage.src = qrPath; // Устанавливаем путь к QR-коду
        qrContainer.style.display = 'block';
        this.textContent = 'Скрыть QR-код';
      } else {
        qrContainer.style.display = 'none';
        this.textContent = 'Показать QR-код';
      }
    });
  });
});
