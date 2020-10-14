'use strict';
(()=>{
  const map = window.data.map;
  const pinsContainer = map.querySelector(`.map__pins`);
  const renderPinsList = (advertisements) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < advertisements.length; i++) {
      let pin = window.pin.getPin(advertisements[i]);
      fragment.appendChild(pin);
    }
    pinsContainer.appendChild(fragment);
  };
  const renderCard = (advertisement)=>{
    const newCard = window.card.getCard(advertisement);
    const cardClose = newCard.querySelector(`.popup__close`);
    map.insertBefore(newCard, map.querySelector(`.map__filters-container`));
    cardClose.addEventListener(`click`, onPopupClose);
    document.addEventListener(`keydown`, onPopupClose);
  };
  const onPopupClose = (evt)=>{
    if (evt.key !== `Escape` && evt.button !== 0) {
      return;
    }
    map.querySelector(`.map__card `).remove();
  };

  window.render = {
    'renderPinsList': renderPinsList,
    'renderCard': renderCard,
    'pinsContainer': pinsContainer
  };

})();
