let user_icon = document.querySelector(".user-header__icon");
user_icon.addEventListener("click", function(e) {
	let user_menu = document.querySelector('.user-header__menu');
	user_menu.classList.toggle('_active');
});

let icon_menu = document.querySelector(".icon-menu");
let menu__body = document.querySelector(".menu__body");
icon_menu.addEventListener("click", function(e) {
	icon_menu.classList.toggle('_active');
	menu__body.classList.toggle('_active');
});

document.documentElement.addEventListener("click", function(e){
	if (!e.target.closest('.user-header')) {
		let user_menu = document.querySelector(".user-header__menu");
		user_menu.classList.remove('_active');
	}
});