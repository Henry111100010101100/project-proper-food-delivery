function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);

    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const modalTrigger = document.querySelectorAll(triggerSelector),//document.querySelectorAll('[data-modal]'),
        modal = document.querySelector(modalSelector); //document.querySelector('.modal'); // Обработчики событий, повешенные на элементы полученные из html через querySelector не применятся на элементы, созданные динамически (через JS), поэтому необходимо использовать делегирование событий; 

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // когда в обработчике событий мы используем колбэк функцию, мы не должны ее сразу же вызывать, поскольку она должна сработать только после клика, но здесь, при использовании modalSelector нам нужно обязательно его указать, поэтому мы используем прием оборачивания используемой функции в отдельный самостоятельный колбек;
    });    

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {openModal};
export {closeModal};