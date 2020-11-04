'use strict';
let MAX_PIN_COUNT = 5;
const map = window.data.map;
const pinsContainer = map.querySelector(`.map__pins`);


const renderPinsList = (advertisements) => {
  const fragment = document.createDocumentFragment();
  let count = advertisements.length < 5 ? advertisements.length : MAX_PIN_COUNT;
  for (let i = 0; i < count; i++) {
    let pin = window.pin.get(advertisements[i], i);
    try {
      fragment.appendChild(pin);
    } catch (e) {
      pin = ``;
    }
  }
  pinsContainer.appendChild(fragment);
};
const renderCard = (advertisement) => {
  const newCard = window.card.get(advertisement);
  const cardClose = newCard.querySelector(`.popup__close`);
  map.insertBefore(newCard, map.querySelector(`.map__filters-container`));
  cardClose.addEventListener(`click`, onPopupClose);
  document.addEventListener(`keydown`, onPopupClose);
};

const onSmallPinActivated = (evt) => {
  let indexAdv;
  if (evt.key !== window.data.BUTTON_ENTER && evt.button !== window.data.LEFT_MOUSE_BUTTON) {
    return;
  }
  if (evt.target.parentNode.type !== `button` && evt.target.type !== `button`) {
    return;
  }
  const mapCard = window.data.map.querySelector(`.map__card `);
  if (mapCard) {
    mapCard.remove();
  }
  let pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((pin)=>{
    pin.classList.remove(`map__pin--active`);
  });
  if (evt.target.dataset.id) {
    indexAdv = evt.target.dataset.id;
    evt.target.classList.add(`map__pin--active`);
  } else {
    indexAdv = evt.target.parentNode.dataset.id;
    evt.target.parentNode.classList.add(`map__pin--active`);
  }
  let adv = window.download.advertisements;
  if (window.filterForm.advertisements) {
    adv = window.filterForm.advertisements;
  }
  window.map.renderCard(adv[indexAdv]);
};

const onPopupClose = (evt) => {
  if (evt.key !== window.data.BUTTON_ESCAPE && evt.button !== window.data.LEFT_MOUSE_BUTTON) {
    return;
  }
  map.querySelector(`.map__card `).remove();
};

window.map = {
  renderPinsList,
  renderCard,
  pinsContainer,
  onSmallPinActivated
};
