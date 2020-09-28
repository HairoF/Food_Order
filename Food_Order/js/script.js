window.addEventListener('DOMContentLoaded', function() {
   
    // Tabs

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

    //Timer

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

    // Modal window

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

    // Use class for cards

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


    // Forms

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

    // Slider

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

    // Calculator

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
});


class Khayrutdinovs {
    constructor(age,name,gender) {
        this.age = age;
        this.name = name;
        this._gender = gender;
    }
    
    
    say = () => {
        let sname = new Promise(resolve => {
            let surname = (this._gender === 'female') ? 'Хайрутдинов' : 'Хайрутдинова';
            resolve(surname);
        })
        sname.then( () => console.log(`Сейчас с вами разговаривает ${this.surname} ${this.name} ${this.age} лет, пол ${this._gender}`))       
    }
    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }
}
const man = new Khayrutdinovs(25,'Фидан', 'мужчина');



man.say();