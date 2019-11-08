const carousel = document.querySelector('.carousel--items');
const carouselItems = carousel.children;
/**
 * Convert from HTMLCollection to table
 */
const slides = [...carouselItems];
const slideWidth = slides[0].getBoundingClientRect().width;

const nextButton = document.querySelector('.carousel--btn__next');
const prevButton = document.querySelector('.carousel--btn__prev');

/**
 * Set the position of each slide
 *
 * @param {HTMLElement[]} slides
 * @param {number} slideWidth
 */
function positionSlides(slides, slideWidth) {
	const length = slides.length;

	for (let index = 0; index < length; index++) {
		slides[index].style.left = index * slideWidth + 'px';
	}
}

positionSlides(slides, slideWidth);

nextButton.addEventListener('click', function() {
	const currentSlide = carousel.querySelector('.active');
	const nextSlide = currentSlide.nextElementSibling;
	const position = nextSlide.style.left;
	carousel.style.transform = `translateX(-${position})`;
	// carousel.style.transform = 'translateX(-' + position + ')';
	currentSlide.classList.remove('active');
	nextSlide.classList.add('active');
});

prevButton.addEventListener('click', function() {
	const currentSlide = carousel.querySelector('.active');
	const prevSlide = currentSlide.previousElementSibling;
	const position = prevSlide.style.left;
	carousel.style.transform = `translateX(-${position})`;
	currentSlide.classList.remove('active');
	prevSlide.classList.add('active');
});
