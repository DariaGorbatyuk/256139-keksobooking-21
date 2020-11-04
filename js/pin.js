'use strict';
const get = (advertisement, i) => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let newPin = pinTemplate.cloneNode(true);
  const pinImg = newPin.querySelector(`img`);
  newPin.style = `left: ${advertisement.location.x - PIN_WIDTH / 2}px; top: ${advertisement.location.y - PIN_HEIGHT}px`;
  newPin.dataset.id = i;
  try {
    pinImg.src = advertisement.author.avatar;
  } catch (e) {
    pinImg.remove();
  }
  try {
    pinImg.alt = advertisement.offer.title;
  } catch (e) {
    return undefined;
  }
  return newPin;
};
window.pin = {
  get
};
