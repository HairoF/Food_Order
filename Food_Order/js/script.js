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
          modal = document.querySelector('.modal'),
          closeModalBtn = document.querySelector('[data-close]');
          
    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalWindow.forEach( (btn) => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => { // close modal with event.target
        let target = event.target;

        if (target.classList.contains('modal')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code == 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 8000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll',showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
});
