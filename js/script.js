//const { url } = require("inspector");

window.addEventListener('DOMContentLoaded', function() {
    const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        cards = require('./modules/cards'),
        forms = require('./modules/forms'),
        timer = require('./modules/timer'),
        slider = require('./modules/slider'),
        calc = require('./modules/calc');
    
    tabs();
    modal();
    cards();
    forms();
    timer();
    slider();
    calc();

});