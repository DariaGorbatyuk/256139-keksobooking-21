'use strict';
(()=>{
  const get = (advertisement) => {
    const PIN_WIDTH = 50;
    const PIN_HEIGHT = 70;
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    let newPin = pinTemplate.cloneNode(true);
    const pinImg = newPin.querySelector(`img`);
    newPin.style = `left: ${advertisement.location.x - PIN_WIDTH / 2}px; top: ${advertisement.location.y - PIN_HEIGHT}px`;
    newPin.setAttribute(`data-id`, advertisement.id);
    pinImg.setAttribute(`src`, advertisement.author.avatar);
    pinImg.setAttribute(`alt`, advertisement.offer.title);
    return newPin;
  };
  window.pin = {
    get
  };
})();
