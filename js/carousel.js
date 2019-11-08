const carousel = document.querySelector('.carousel--items');
const carouselItems = carousel.children;
/**
 * Convert from HTMLCollection to table
 */
const slides = [...carouselItems];
const slideWidth = slides[0].getBoundingClientRect().width;

const nextButton = document.querySelector('.carousel--btn__next');
const prevButton = document.querySelector('.carousel--btn__prev');

const navigation = document.querySelector('.carousel--navigation');

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

/**
 * Hide the correct button
 *
 * @param {HTMLElement} targetSlide
 * @param {HTMLElement} slides
 */
function hideButton(targetSlide, slides) {
	if (targetSlide === slides[0]) {
		nextButton.classList.remove('hide');
		prevButton.classList.add('hide');
	} else if (targetSlide === slides[slides.length - 1]) {
		nextButton.classList.add('hide');
		prevButton.classList.remove('hide');
	} else {
		nextButton.classList.remove('hide');
		prevButton.classList.remove('hide');
	}
}

/**
 * Finds index of element that is event target
 *
 * @param {HTMLElement} item
 * @param {HTMLElement[]} items
 * @returns {number} index
 */
function findIndex(item, items) {
	for (let index = 0; index < items.length; index++) {
		if (item === items[index]) return index;
	}
}

positionSlides(slides, slideWidth);

nextButton.addEventListener('click', function() {
	const currentSlide = carousel.querySelector('.active');
	const targetSlide = currentSlide.nextElementSibling;
	hideButton(targetSlide, slides);
	moveSlide(carousel, currentSlide, targetSlide);
});

prevButton.addEventListener('click', function() {
	const currentSlide = carousel.querySelector('.active');
	const targetSlide = currentSlide.previousElementSibling;
	hideButton(targetSlide, slides);
	moveSlide(carousel, currentSlide, targetSlide);
});

const dots = [...navigation.children];

navigation.addEventListener('click', function(event) {
	if (event.target === navigation) return;
	const targetDot = event.target;
	const index = findIndex(targetDot, dots);
	const currentSlide = carousel.querySelector('.active');
	const targetSlide = slides[index];
	const currentDot = navigation.querySelector('.active');
	hideButton(targetSlide, slides);
	moveSlide(carousel, currentSlide, targetSlide);
	toggleActive(currentDot, targetDot);
});
