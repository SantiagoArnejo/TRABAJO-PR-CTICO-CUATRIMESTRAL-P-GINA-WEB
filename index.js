let currentSlide = 0;
const slides = document.getElementsByClassName('carrusel-item');

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  if (index < 0) currentSlide = slides.length - 1;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
    slides[i].classList.remove('active');
  }
  slides[currentSlide].style.display = 'block';
  slides[currentSlide].classList.add('active');
}

function moveSlide(n) {
  currentSlide += n;
  showSlide(currentSlide);
}


window.onload = function() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  if (slides.length > 0) {
    slides[0].style.display = 'block';
    slides[0].classList.add('active');
  }

  const prevBtn = document.querySelector('.carrusel-control.prev');
  const nextBtn = document.querySelector('.carrusel-control.next');
  if (prevBtn) prevBtn.addEventListener('click', function() { moveSlide(-1); });
  if (nextBtn) nextBtn.addEventListener('click', function() { moveSlide(1); });
};