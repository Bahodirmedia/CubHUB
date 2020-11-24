window.onload = function () {
	document.body.classList.add('loaded_hiding');
	window.setTimeout(function () {
		document.body.classList.add('loaded');
		document.body.classList.remove('loaded_hiding');
	}, 500);
}

document.addEventListener('DOMContentLoaded', () => {

	// Global Variables
	const burger = document.querySelector('.header__burger');
	const headerMenu = document.querySelector('.header__menu');
	const sections = document.querySelectorAll('section')
	const toTop = document.querySelector('.totop');
	const headerHeight = document.querySelector('.header__top').offsetHeight;
	let prevScroll = window.pageYOffset;

	// Hiding navigation into burger in mobile devices
	burger.addEventListener('click', () => {
		burger.classList.toggle('active');
		headerMenu.classList.toggle('active');
	});


	// dynamically creating header links by counting sections
	let createMenu = () => {
		for (let element of sections) {
			let headerLi = document.createElement('li');
			let headerLink = document.createElement('a');
			headerLink.className = 'header__link';
			headerLink.href = ('#' + element.id)
			headerLink.innerText = element.dataset.name;
			headerMenu.appendChild(headerLi);
			headerLi.appendChild(headerLink);
		}
	}

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

		// Changing active class on links
		headerLink = headerMenu.querySelectorAll('.header__link');
		let index = sections.length;
		
		// while loop is taken from stackoverflow.com forum.
		while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

		headerLink.forEach((link) => link.classList.remove('active'));
		headerLink[index].classList.add('active');
	};

	createMenu()

	//On click scroll to top of page
	toTop.addEventListener('click', () => {
		document.documentElement.scrollTop = 0;
	});	
})



