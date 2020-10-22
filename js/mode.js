'use strict';
(() => {
  const pinsContainer = window.map.pinsContainer;
  // move to move
  let startCoords = {x: 0, y: 0};

  const setStateForTags = (tags, state) => {
    tags.forEach((item) => {
      item.disabled = state;
    });
  };
  const onMainPinMouseDown = (evt)=>{
    startCoords = getCoords(evt);
    window.map.pinsContainer.addEventListener(`mousemove`, onMouseMove);
    window.map.pinsContainer.addEventListener(`mouseup`, onMouseUp);
  };
  const getCoords = (evt)=>{
    return {
      x: evt.clientX,
      y: evt.clientY
    };
  };
  const onMouseMove = (moveEvt)=>{
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    window.data.mainPin.style.top = `${window.data.mainPin.offsetTop - shift.y}px`;
    window.data.mainPin.style.left = `${window.data.mainPin.offsetLeft - shift.x}px`;
  };
  const onMouseUp = (upEvt)=>{
    upEvt.preventDefault();
    window.form.setNewAddress(false);
    window.map.pinsContainer.removeEventListener(`mousemove`, onMouseMove);
    window.map.pinsContainer.removeEventListener(`mouseup`, onMouseUp);
  };
  const onMainPinActive = (evt) => {
    if (evt.button !== window.data.LKM && evt.key !== window.data.BUTTON_ENTER) {
      return;
    }
    if (!window.mode.isActive) {
      window.mode.setActive();
    }
    window.data.mainPin.removeEventListener(`keydown`, onMainPinActive);
    window.data.mainPin.removeEventListener(`click`, onMainPinActive);
  };

  const setPassive = () => {
    window.mode.isActive = false;
    window.data.map.classList.add(`map--faded`);
    window.form.adForm.classList.add(`ad-form--disabled`);
    setStateForTags(window.form.adFieldsets, true);
    setStateForTags(window.form.filterSelects, true);
    window.form.setNewAddress(true);
    window.data.mainPin.addEventListener(`click`, onMainPinActive);
    window.data.mainPin.addEventListener(`keydown`, onMainPinActive);
    window.data.mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  };

  const setActive = () => {
    window.mode.isActive = true;
    setStateForTags(window.form.adFieldsets, false);
    setStateForTags(window.form.filterSelects, false);
    window.data.map.classList.remove(`map--faded`);
    window.form.adForm.classList.remove(`ad-form--disabled`);
    window.map.renderPinsList(window.download.advertisements);
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
