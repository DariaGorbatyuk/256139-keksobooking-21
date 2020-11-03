'use strict';

const pinsContainer = window.map.pinsContainer;
const map = window.data.map;
const mainPin = window.data.mainPin;
const mapWidth = map.offsetWidth;
const mapHeight = map.offsetHeight;
let isActive;
let startCoords = {x: 0, y: 0};

const setStateForTags = (tags, state) => {
  tags.forEach((item) => {
    item.disabled = state;
  });
};
const setPassive = () => {
  isActive = false;
  window.data.map.classList.add(`map--faded`);
  window.form.adForm.classList.add(`ad-form--disabled`);
  setStateForTags(window.form.adFieldsets, true);
  setStateForTags(window.filterForm.selects, true);
  mainPin.style = `left: ${(mapWidth - mainPin.offsetWidth) / 2}px; top: ${mapHeight / 2}px;`;
  window.form.setNewAddress(true);
  mainPin.addEventListener(`click`, onMainPinActive);
  mainPin.addEventListener(`keydown`, onMainPinActive);
  mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
};

const setActive = () => {
  isActive = true;
  setStateForTags(window.form.adFieldsets, false);
  setStateForTags(window.filterForm.selects, false);
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

const onMainPinMouseDown = (evt) => {
  startCoords = getCoords(evt);
  window.map.pinsContainer.addEventListener(`mousemove`, onMouseMove);
  window.map.pinsContainer.addEventListener(`mouseup`, onMouseUp);
};
const getCoords = (evt) => {
  return {
    x: evt.clientX,
    y: evt.clientY
  };
};
const onMouseMove = (moveEvt) => {
  moveEvt.preventDefault();

  let shift = {
    x: startCoords.x - moveEvt.clientX,
    y: startCoords.y - moveEvt.clientY
  };

  startCoords = {
    x: moveEvt.clientX,
    y: moveEvt.clientY
  };
  mainPin.style.top = `${mainPin.offsetTop - shift.y}px`;
  mainPin.style.left = `${mainPin.offsetLeft - shift.x}px`;
};
const onMouseUp = (upEvt) => {
  upEvt.preventDefault();
  window.form.setNewAddress(false);
  window.map.pinsContainer.removeEventListener(`mousemove`, onMouseMove);
  window.map.pinsContainer.removeEventListener(`mouseup`, onMouseUp);
};
const onMainPinActive = (evt) => {
  if (evt.button !== window.data.LEFT_MOUSE_BUTTON && evt.key !== window.data.BUTTON_ENTER) {
    return;
  }
  if (!isActive) {
    setActive();
  }
  mainPin.removeEventListener(`keydown`, onMainPinActive);
  mainPin.removeEventListener(`click`, onMainPinActive);
};

window.mode = {
  setActive,
  setPassive
};

setPassive();
