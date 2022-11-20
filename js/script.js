"use strict";

//! menu-burger 

const burgerMenu = document.querySelector('.menu__burger');
const menuBody = document.querySelector('.menu__body');
if (burgerMenu) {
	burgerMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('lock');
		burgerMenu.classList.toggle('active');
		menuBody.classList.toggle('active');
	});
}

//! scroll

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);	
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.menu').offsetHeight;

			if (burgerMenu.classList.contains('active')) {
				document.body.classList.remove('lock');
				burgerMenu.classList.remove('active');
				menuBody.classList.remove('active');
			} 

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

//! popups

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

const timeout = 500;

let unlock = true;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        }); 
    }
}

const popupCloseIcon = document.querySelectorAll('.popup__close');
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener('click', function(e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", function(e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock () {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}
document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

function drawChildrenCanvas() {
    const canvas = document.getElementById('canvas-children');

    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');   

        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = 50;

        let width = ctx.canvas.width, 
            height = ctx.canvas.height;

        let centerX = window.innerWidth / 2,
            centerY = height / 2;

        ctx.strokeStyle = 'rgba(0, 0, 0, .5)';
    
        ctx.beginPath();

        ctx.lineTo(centerX - 50, 10);
        ctx.lineTo(250, height);

        ctx.moveTo(centerX - 10, 10);
        ctx.lineTo(centerX - 10, 10);
        ctx.lineTo(centerX - 150, height);

        ctx.moveTo(centerX + 10, 10);
        ctx.lineTo(centerX + 10, 10);
        ctx.lineTo(centerX + 150, height);

        ctx.moveTo(centerX + 50, 10);
        ctx.lineTo(centerX + 50, 10);
        ctx.lineTo(width - 250, height);

        ctx.closePath();
        ctx.stroke();
    }
}

drawChildrenCanvas();

function drawGrParentsCanvas() {
    const canvas = document.getElementById('canvas-grparents');

    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');   

        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = 50;

        let width = ctx.canvas.width, 
            height = ctx.canvas.height;

        let centerX = window.innerWidth / 2;

        ctx.strokeStyle = 'rgba(0, 0, 0, .5)';
    
        ctx.beginPath();

        ctx.lineTo(centerX - 50, height - 10);
        ctx.lineTo(450, 0);

        ctx.moveTo(centerX + 50, height - 10);
        ctx.lineTo(centerX + 50, height - 10);
        ctx.lineTo(width - 450, 0   );

        ctx.closePath();
        ctx.stroke();
    }
}

drawGrParentsCanvas();

