'use strict';
(() => {
  const pinsContainer = window.map.pinsContainer;

  const setStateForTags = (tags, state) => {
    tags.forEach((item) => {
      item.disabled = state;
    });
  };

  const setPassive = () => {
    setStateForTags(window.form.adFieldsets, true);
    setStateForTags(window.form.filterSelects, true);
    window.form.setNewAddress(true);
  };

  const setActive = () => {
    window.mode.isActive = true;
    setStateForTags(window.form.adFieldsets, false);
    setStateForTags(window.form.filterSelects, false);
    window.data.map.classList.remove(`map--faded`);
    window.form.adForm.classList.remove(`ad-form--disabled`);
    window.map.renderPinsList(window.load.advertisements);
    window.form.adAddress.readOnly = true;
    window.form.verifyRoomsCapacity();
    window.form.verifyPriceForNight();
    pinsContainer.addEventListener(`click`, window.map.onSmallPinActivated);
    pinsContainer.addEventListener(`keydown`, window.map.onSmallPinActivated);
    window.form.adTypeOfHousing.addEventListener(`change`, window.form.onChangeAdTypeOfHousing);
    window.form.adRoomNumber.addEventListener(`change`, window.form.onChangeAdRoomCapacity);
    window.form.adRoomCapacity.addEventListener(`change`, window.form.onChangeAdRoomCapacity);
    window.form.timeIn.addEventListener(`change`, window.form.onTimeChange);
    window.form.timeOut.addEventListener(`change`, window.form.onTimeChange);
  };

  window.mode = {
    setPassive,
    setActive,
    isActive: false
  };

})();
