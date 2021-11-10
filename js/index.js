'use strict';

const disableScroll = () => {
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    document.body.scrollPosition = window.scrollY;

    document.body.style.cssText = `
        overflow:hidden;
        position: fixed;
        top: -${document.body.scrollPosition}px;
        left: 0;
        height: 100vh;
        width: 100vw;
        padding-right: ${widthScroll}; 
    `;
};


const enableScroll = () => {
    document.body.style.cssText = 'position: relative';
    window.scroll({top: document.body.scrollPosition});
};

{
    //modal
    const presentOrderBtn = document.querySelector('.present__order-btn'),
        pageOverlayModal = document.querySelector('.page__overlay_modal'),
        modalClose = document.querySelector('.modal__close');       


    const handlerModal = (openBtn, closeBtn, modalOverlay, modalParentClass, openSelector, speedKey = 'fast') => {

        let opacity = 0;
        const speed = {
            slow: 15,
            medium: 8,
            fast: 1,
            default: 5
        };

        const openModal = () => {
            disableScroll();
            modalOverlay.style.opacity = opacity;
            modalOverlay.classList.add(openSelector);
            const timer = setInterval(() => {
                opacity += 0.02;
                modalOverlay.style.opacity = opacity;
                if (opacity >= 1) clearInterval(timer);
            }, speed[speedKey] );
        };

        const closeModal = () => {
            enableScroll();
            const timer = setInterval(() => {
                opacity -= 0.02;
                modalOverlay.style.opacity = opacity;
                if (opacity <= 0) {
                    clearInterval(timer);
                    modalOverlay.classList.remove(openSelector);
                }
            },  speed[speedKey]);
            
        };

        openBtn.addEventListener('click', openModal);
        
        closeBtn.addEventListener('click', closeModal);
        
        modalOverlay.addEventListener('click', (e) => {
            let target = e.target;
            let event = new Event('click');
            //if(!target.closest(`.${modalParentClass}`)) closeBtn.dispatchEvent(event);
            if(!target.closest(`.${modalParentClass}`)) closeModal();
        });
        
    };




    handlerModal(presentOrderBtn, modalClose, pageOverlayModal, 'modal__container', 'page__overlay_modal_open', 'slow');

}

{
    //burger menu
    const headerContacts = document.querySelector('.header__contacts'),
        headerContactsBurger = document.querySelector('.header__contacts-burger');

    const handlerBurger = (openBtn, menu, openSelector) => {
        openBtn.addEventListener('click', (e) => {
            if (menu.classList.contains(openSelector)){
                menu.style.height = '';
                menu.classList.remove(openSelector);
            } else {                
                menu.style.height = menu.scrollHeight + 'px';
                menu.classList.add(openSelector);
            }
            
        });
    };

    handlerBurger(headerContactsBurger, headerContacts, 'header__contacts_open')
    
}