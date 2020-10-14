'use strict';
(()=>{
  const getPin = (advertisement) => {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    let newPin = pinTemplate.cloneNode(true);
    const pinImg = newPin.querySelector(`img`);
    const pinWidth = Number(pinImg.getAttribute(`width`));
    const pinHeight = Number(pinImg.getAttribute(`height`));
    newPin.style = `left: ${advertisement.location.x - pinWidth / 2}px; top: ${advertisement.location.y + pinHeight}px`;
    newPin.setAttribute(`data-id`, advertisement.id);
    pinImg.setAttribute(`src`, advertisement.author.avatar);
    pinImg.setAttribute(`alt`, advertisement.offer.title);
    return newPin;
  };
  window.pin = {
    'getPin': getPin
  };
})();
