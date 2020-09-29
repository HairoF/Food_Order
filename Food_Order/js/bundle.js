/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calculator() {
    const resultCal = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375');
    }

    function setLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((elem) => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') == localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio-to') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            } 
        });
    }

    setLocalSettings('#gender div','calculating__choose-item_active');
    setLocalSettings('.calculating__choose_big div','calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            resultCal.textContent = '_____';
            return;
        }

        if (sex === 'female') {
            resultCal.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            resultCal.textContent = Math.round((447.6 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    
    calcTotal();

    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((elem) => {
            elem.addEventListener('click', (event) => {
                if (event.target.dataset.ratioTo) {
                    ratio = +event.target.dataset.ratioTo;
                    localStorage.setItem('ratio', +event.target.dataset.ratioTo);
                } else {
                    sex = event.target.id;
                    localStorage.setItem('sex', event.target.id);
                }
                elements.forEach( (elem) => {
                    elem.classList.remove(activeClass);
                });

                event.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', (event) => {

            if (input.value.match(/\D/g)) {
                input.style.border = '3px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(event.target.id) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = input.value;
                    break;
                case 'age':
                    age = input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
}

module.exports = calculator;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeCurrency();
        }

        changeCurrency() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResours = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Couldn't fetch ${url}, with status: ${result.status}`);
        }
        
        return await result.json();
    };

    getResours('http://localhost:3000/menu')
        .then((data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        }));


}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

const forms = document.querySelectorAll('form');

const message = {
    loading: './img/form/spinner.svg',
    success: 'Скоро свяжемся',
    failure: 'Что-то не так...'
};

forms.forEach((item) => {
    bindPostData(item);
});

// function for post Data with async await
const postData = async (url,data) => {
    const result = await fetch(url, { //this is Promise
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data       
    });
    
    return await result.json();
};

function bindPostData(form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(response => {
            showThanksModal(message.success);
            statusMessage.remove();
        })
        .catch(() => {
            showThanksModal(message.failure);
        })
        .finally(() => {
            form.reset();
        });
    });
}
// Update modal
function showThanksModal(message) {
    const previousModalDialog = document.querySelector('.modal__dialog');

    previousModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
        thanksModal.remove();
        previousModalDialog.classList.add('show');
        previousModalDialog.classList.remove('hide');
        closeModal();
    }, 5000);
}


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
    const modalWindow = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
          
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalWindow.forEach( (btn) => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (event) => { // close modal with event.target
        let target = event.target;

        if (target.classList.contains('modal') || target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code == 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 10000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll',showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {

    const slids = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          current = document.getElementById('current'),
          total = document.getElementById('total'),
          slidsWrapper = document.querySelector('.offer__slider-wrapper'),
          slidsField = document.querySelector('.offer__slider-inner'),
          slidsWidth = window.getComputedStyle(slidsWrapper).width;

    let slidesIndex = 1;
    let offset = 0;
    changeSliderNumbering();

    if (slids.length < 10) {
        total.innerHTML = `0${slids.length}`;
        current.innerHTML = `0${slidesIndex}`;
    } else {
        total.innerHTML = slids.length;
        current.innerHTML = slidesIndex;
    } 

    function changeSliderNumbering() {
        if (slids.length < 10) {
            current.innerHTML = `0${slidesIndex}`;
        } else {
            current.innerHTML = slidesIndex;
        }
    }


    slidsField.style.width = 100 * slids.length + '%';
    slidsField.style.display = 'flex';
    slidsField.style.transition = '0.5s all';

    slidsWrapper.style.overflow = 'hidden';
    
    slids.forEach((slide) => {
        slide.style.width = slidsWidth;
    });
    slider.style.position = 'relative';
//generate dots for sliders
    const dotsInd = document.createElement('ol'),
          dots = [];

    dotsInd.classList.add('carousel-indicators');
    slider.append(dotsInd);

    for(let i = 0; i < slids.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if( i == 0) {
            dot.style.opacity = 1;
        }

        dotsInd.append(dot);
        dots.push(dot);
    }
    

    next.addEventListener('click', () => {
        if(offset == +slidsWidth.slice(0, slidsWidth.length - 2) * (slids.length - 1)) {
            offset = 0;
        } else {
            offset += +slidsWidth.slice(0, slidsWidth.length - 2);
        }

        slidsField.style.transform = `translateX(-${offset}px)`;
        
        if(slidesIndex == slids.length) {
            slidesIndex = 1;
        } else {
            slidesIndex++;
        }

        changeSliderNumbering();

        dots.forEach((dot) => dot.style.opacity = '.5');
        dots[slidesIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if(offset == 0) {
            offset = +slidsWidth.slice(0, slidsWidth.length - 2) * (slids.length - 1);
        } else {
            offset -= +slidsWidth.slice(0, slidsWidth.length - 2);
        }

        slidsField.style.transform = `translateX(-${offset}px)`;
        if(slidesIndex == 1) {
            slidesIndex = slids.length;
        } else {
            slidesIndex--;
        }

        changeSliderNumbering();

        dots.forEach((dot) => dot.style.opacity = '.5');
        dots[slidesIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slidesIndex = slideTo;
            console.log(slidesIndex);
            offset = +slidsWidth.slice(0, slidsWidth.length - 2) * (slideTo - 1);
            
            slidsField.style.transform = `translateX(-${offset}px)`;

            changeSliderNumbering();

            dots.forEach((dot) => dot.style.opacity = '.5');
            dots[slidesIndex - 1].style.opacity = 1;
        });
    });
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() { // скрываем табы
        tabsContent.forEach( (item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach( (tab) => {
            tab.classList.remove('tabheader__item_active');
        });
    }
  
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function() {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach( (item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent();
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
    const deadLine = '2020-09-30';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor( t / (1000 * 60 *60 * 24) ), /* сколько дней осталось до даты */
              hours = Math.floor( (t / (1000 * 60 * 60) % 24) ),
              minutes = Math.floor( (t / 1000 / 60) % 60),
              seconds = Math.floor( (t / 1000) % 60);
              
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getTwoDigits(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerInterval = setInterval(updateClock, 1000);
        
        updateClock(); //запуск таймера без задержки

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = getTwoDigits(t.days),
            hours.textContent = getTwoDigits(t.hours),
            minutes.textContent = getTwoDigits(t.minutes),
            seconds.textContent = getTwoDigits(t.seconds);

            if (t.total <= 0) {
                clearInterval(timerInterval);
            }
        }
    }

    setClock('.timer', deadLine);
}

module.exports = timer;

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', function() {
   
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();


});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map