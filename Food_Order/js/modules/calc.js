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