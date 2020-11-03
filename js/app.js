// Global Variables
const burger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
const sections = document.querySelectorAll('section')
const toTop = document.querySelector('.totop');
let prevScroll = window.pageYOffset;
const headerHeight = document.querySelector('.header__top').offsetHeight;

// Hiding navigation into burger in mobile devices
burger.addEventListener('click', () => {
	burger.classList.toggle('active');
	headerMenu.classList.toggle('active');
});

// On scroll making navigation fixed
window.onscroll = () => {
	let currentScroll = window.pageYOffset;
	headerNav = document.querySelector('.header__top');
	if (headerHeight > prevScroll) {
		headerNav.classList.remove('header__fixed');
	} else if (prevScroll > currentScroll) {
		headerNav.classList.add('header__fixed');
		headerNav.style.top = "0";
		toTop.style.display = 'none';
	} else {
		headerNav.classList.remove('header__fixed');
		headerNav.style.top = "-200px";
		toTop.style.display = 'inline-flex';
	}
	prevScroll = currentScroll;
};


let getActiveSection = () => {
	emountOfSections = sections[0];
	minValueOfSections = 99999;
	for (section of sections) {
		let SectionHeight = section.getBoundingClientRect();
		if (SectionHeight.top > -300 & SectionHeight.top < minValueOfSections) {
			minValueOfSections = SectionHeight.top;
			emountOfSections = section;
		};
	};
	return emountOfSections;
};


// Building navigation with adding new elements
let addNavElements = () => {
	for (let element of sections) {
		let headerLink = document.createElement('li');
		headerLink.className = 'header__link';
		headerLink.dataset.name = element.id;
		headerLink.innerText = element.dataset.name;
		headerMenu.appendChild(headerLink);
	};
};


// Add  'active' class to section
let setActiveSection = () => {
	window.addEventListener('scroll', () => {
		let section = getActiveSection();
		section.classList.add('section__active');
		for (let element of sections) {
			if (element.id != section.id & element.classList.contains('section__active')) {
				element.classList.remove('section__active');
			}
		}
		const activeLink = document.querySelector('li[data-name="' + section.id + '"]');
		activeLink.classList.add('active');
		const headerLinks = document.querySelectorAll('.header__link');
		for (let element of headerLinks) {
			if (element.dataset.name != activeLink.dataset.name & element.classList.contains('active')) {
				element.classList.remove('active');
			}
		};
	});
};

//Scrol to the clicked section
let scrollToClick = () => {
	headerMenu.addEventListener('click', () => {
		const clickedLink = document.querySelector('#' + event.target.dataset.name)
		clickedLink.scrollIntoView();
	});
};



addNavElements();  scrollToClick(); setActiveSection();


//On click scroll to top of page
toTop.addEventListener('click', () => {
	document.documentElement.scrollTop = 0;
});