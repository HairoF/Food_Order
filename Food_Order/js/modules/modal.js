function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(windowSelector, modalSelector, modalTimerId) {
    const modalWindow = document.querySelectorAll(windowSelector),
          modal = document.querySelector(modalSelector);
          


    modalWindow.forEach( (btn) => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });



    modal.addEventListener('click', (event) => { // close modal with event.target
        let target = event.target;

        if (target.classList.contains('modal') || target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code == 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll',showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openModal, closeModal};