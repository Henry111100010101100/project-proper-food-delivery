    import tabs from './modules/tabs';
    import modal from './modules/modal';
    import cards from './modules/cards';
    import forms from './modules/forms';
    import timer from './modules/timer';
    import slider from './modules/slider';
    import calc from './modules/calc';
    import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    cards();
    forms('form', modalTimerId);
    timer('.timer', '2023-02-22');
    slider({
            container: '.offer__slider',
            nextArrow: '.offer__slider-next',
            prevArrow: '.offer__slider-prev',
            slide: '.offer__slide',
            totalCounter: '#total',
            currentCounter: '#current',
            wrapper: '.offer__slider-wrapper',
            field: '.offer__slider-inner'
        });

    calc();

});