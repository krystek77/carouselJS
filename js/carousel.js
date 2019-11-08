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

/**
 * Move slide
 *
 * @param {HTMLElement} carousel
 * @param {HTMLElement} currentSlide
 * @param {HTMLElement} targetSlide
 */
function moveSlide(carousel, currentSlide, targetSlide) {
	const position = targetSlide.style.left;
	carousel.style.transform = `translateX(-${position})`;
	toggleActive(currentSlide, targetSlide);
}

/**
 * Toggle class active between 2 elements
 *
 * @param {HTMLElement} currentSlide
 * @param {HTMLElement} targetSlide
 */
function toggleActive(currentSlide, targetSlide) {
	currentSlide.classList.remove('active');
	targetSlide.classList.add('active');
}

positionSlides(slides, slideWidth);

nextButton.addEventListener('click', function() {
	const currentSlide = carousel.querySelector('.active');
	const targetSlide = currentSlide.nextElementSibling;
	moveSlide(carousel, currentSlide, targetSlide);
});

prevButton.addEventListener('click', function() {
	const currentSlide = carousel.querySelector('.active');
	const targetSlide = currentSlide.previousElementSibling;
	moveSlide(carousel, currentSlide, targetSlide);
});
