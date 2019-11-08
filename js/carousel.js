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
const dots = [...navigation.children];

const INTERVAL_TIME = 5000;

let time = 0;

const DIRECTION = Object.freeze({ TO_RIGHT: 1, TO_LEFT: 2 });
let dir = DIRECTION.TO_RIGHT;

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
	const index = findIndex(targetSlide, slides);
	const targetDot = dots[index];
	const currentDot = navigation.querySelector('.active');
	toggleActive(currentDot, targetDot);
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
time = setInterval(autoMoveSlide, INTERVAL_TIME);

nextButton.addEventListener('click', function() {
	clearInterval(time);
	const currentSlide = carousel.querySelector('.active');
	const targetSlide = currentSlide.nextElementSibling;
	hideButton(targetSlide, slides);
	moveSlide(carousel, currentSlide, targetSlide);
	time = setInterval(autoMoveSlide, INTERVAL_TIME);
});

prevButton.addEventListener('click', function() {
	clearInterval(time);
	const currentSlide = carousel.querySelector('.active');
	const targetSlide = currentSlide.previousElementSibling;
	hideButton(targetSlide, slides);
	moveSlide(carousel, currentSlide, targetSlide);
	time = setInterval(autoMoveSlide, INTERVAL_TIME);
});

navigation.addEventListener('click', function(event) {
	clearInterval(time);
	if (event.target === navigation) return;
	const targetDot = event.target;
	const index = findIndex(targetDot, dots);
	const currentSlide = carousel.querySelector('.active');
	const targetSlide = slides[index];
	const currentDot = navigation.querySelector('.active');
	hideButton(targetSlide, slides);
	moveSlide(carousel, currentSlide, targetSlide);
	toggleActive(currentDot, targetDot);
	time = setInterval(autoMoveSlide, INTERVAL_TIME);
});

function autoMoveSlide() {
	const currentSlide = carousel.querySelector('.active');
	const currentIndex = findIndex(currentSlide, slides);
	let targetSlide = null;

	if (currentIndex === slides.length - 1) {
		dir = DIRECTION.TO_RIGHT;
		targetSlide = currentSlide.previousElementSibling;
		hideButton(targetSlide, slides);
		moveSlide(carousel, currentSlide, targetSlide);
	} else if (currentIndex === 0) {
		dir = DIRECTION.TO_LEFT;
		targetSlide = currentSlide.nextElementSibling;
		hideButton(targetSlide, slides);
		moveSlide(carousel, currentSlide, targetSlide);
	} else {
		if (dir === DIRECTION.TO_LEFT) {
			targetSlide = currentSlide.nextElementSibling;
			hideButton(targetSlide, slides);
			moveSlide(carousel, currentSlide, targetSlide);
		} else if (dir === DIRECTION.TO_RIGHT) {
			targetSlide = currentSlide.previousElementSibling;
			hideButton(targetSlide, slides);
			moveSlide(carousel, currentSlide, targetSlide);
		}
	}
}

console.log(time);
