'use strict';
(()=>{
  const map = window.data.map;
  const pinsContainer = map.querySelector(`.map__pins`);

  const renderPinsList = (advertisements) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < advertisements.length; i++) {
      let pin = window.pin.get(advertisements[i], i);
      fragment.appendChild(pin);
    }
    pinsContainer.appendChild(fragment);
  };
  const renderCard = (advertisement)=>{
    const newCard = window.card.get(advertisement);
    const cardClose = newCard.querySelector(`.popup__close`);
    map.insertBefore(newCard, map.querySelector(`.map__filters-container`));
    cardClose.addEventListener(`click`, onPopupClose);
    document.addEventListener(`keydown`, onPopupClose);
  };

  const onSmallPinActivated = (evt) => {
    if (evt.key !== window.data.BUTTON_ENTER && evt.button !== window.data.LKM) {
      return;
    }
    if (evt.target.parentNode.type !== `button` && evt.target.type !== `button`) {
      return;
    }
    const mapCard = window.data.map.querySelector(`.map__card `);
    if (mapCard) {
      mapCard.remove();
    }
    let indexAdv = evt.target.parentNode.dataset.id;
    if (evt.target.dataset.id) {
      indexAdv = evt.target.dataset.id;
    }
    window.map.renderCard(window.load.advertisements[indexAdv]);
  };

  const onPopupClose = (evt)=>{
    if (evt.key !== window.data.BUTTON_ESCAPE && evt.button !== window.data.LKM) {
      return;
    }
    map.querySelector(`.map__card `).remove();
  };

  window.map = {
    renderPinsList,
    renderCard,
    pinsContainer,
    onSmallPinActivated,
  };

})();