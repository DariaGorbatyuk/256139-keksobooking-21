'use strict';
(() => {
  const pinsContainer = window.render.pinsContainer;
  const advertisements = window.data.advertisements;

  const setStateForTags = (tags, state) => {
    tags.forEach((item) => {
      item.disabled = state;
    });
  };

  const setPassiveMode = () => {
    setStateForTags(window.form.adFieldsets, true);
    setStateForTags(window.form.filterSelects, true);
    window.form.setNewAddress(true);
  };

  const setActiveMode = () => {
    setStateForTags(window.form.adFieldsets, false);
    setStateForTags(window.form.filterSelects, false);
    window.data.map.classList.remove(`map--faded`);
    window.form.adForm.classList.remove(`ad-form--disabled`);
    window.render.renderPinsList(advertisements);
    window.form.adAddress.readOnly = true;
    window.form.setNewAddress(false);
    window.form.verifyRoomsCapacity();
    window.form.verifyPriceForNight();
    pinsContainer.addEventListener(`click`, onSmallPinActive);
    pinsContainer.addEventListener(`keydown`, onSmallPinActive);
    window.form.adTypeOfHousing.addEventListener(`change`, window.form.onChangeAdTypeOfHousing);
    window.form.adRoomNumber.addEventListener(`change`, window.form.onChangeAdRoomCapacity);
    window.form.adRoomCapacity.addEventListener(`change`, window.form.onChangeAdRoomCapacity);
    window.form.timeIn.addEventListener(`change`, window.form.onTimeChange);
    window.form.timeOut.addEventListener(`change`, window.form.onTimeChange);
  };

  const onSmallPinActive = (evt) => {
    if (evt.key !== `Enter` && evt.button !== 0) {
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
    window.render.renderCard(advertisements[indexAdv]);
  };

  window.mods = {
    'setPassiveMode': setPassiveMode,
    'setActiveMode': setActiveMode
  };

})();
