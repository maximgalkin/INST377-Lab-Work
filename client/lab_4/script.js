let slidePosition = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

document.querySelector('#carousel-button-next').addEventListener('click', () => {
  moveToNextSlide();
});

document.querySelector('#carousel-button-prev').addEventListener('click', () => {
  moveToPrevSlide();
});

function updateSlidePosition() {
  // eslint-disable-next-line no-restricted-syntax
  for (let slide of slides) {
    slide.classList.remove('carousel-item-visible');
    slide.classList.add('carousel-item-hidden');
  }

  slides[slidePosition].classList.add('carousel-item-visible');
}



function moveToNextSlide() {

  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition += 1;
  }
  updateSlidePosition();
  console.log(slidePosition);
}

function moveToPrevSlide() {

  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition -= 1;
  }
  updateSlidePosition();
  console.log(slidePosition);
}