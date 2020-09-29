function forms() {
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
}

module.exports = forms;