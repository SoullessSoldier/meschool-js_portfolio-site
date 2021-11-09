'use strict';

const presentOrderBtn = document.querySelector('.present__order-btn'),
    pageOverlayModal = document.querySelector('.page__overlay_modal'),
    modalClose = document.querySelector('.modal__close');


const handlerModal = (openBtn, closeBtn, modalOverlay, modalParentClass, openSelector, speedKey = 'medium') => {

    let opacity = 0;
    const speed = {
        slow: 15,
        medium: 8,
        fast: 1,
        default: 5
    };

    openBtn.addEventListener('click', () => {
        modalOverlay.style.opacity = opacity;
        modalOverlay.classList.add(openSelector);
        const timer = setInterval(() => {
            opacity += 0.02;
            modalOverlay.style.opacity = opacity;
            if (opacity >= 1) clearInterval(timer);
        }, speed[speedKey] ? speed.speedKey: speed.default );
    });
    
    closeBtn.addEventListener('click', () => {
        const timer = setInterval(() => {
            opacity -= 0.02;
            modalOverlay.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(timer);
                modalOverlay.classList.remove(openSelector);
            }
        },  speed[speedKey] ? speed[speedKey]: speed.default );
        
    });
    
    modalOverlay.addEventListener('click', (e) => {
        let target = e.target;
        let event = new Event('click');
        if(!target.closest(`.${modalParentClass}`)) closeBtn.dispatchEvent(event);
    });
    
};




handlerModal(presentOrderBtn, modalClose, pageOverlayModal, 'modal__container', 'page__overlay_modal_open', 'fast');