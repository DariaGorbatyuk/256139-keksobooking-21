'use strict';

const pinsContainer = window.map.pinsContainer;
const map = window.data.map;
const mainPin = window.data.mainPin;
const mainPinAllHeight = mainPin.offsetHeight + window.data.MAIN_PIN_ARROW;
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
  window.form.add.classList.add(`ad-form--disabled`);
  setStateForTags(window.form.adFieldsets, true);
  setStateForTags(window.filterForm.selects, true);
  mainPin.style = `left: ${(mapWidth - mainPin.offsetWidth) / 2}px; top: ${mapHeight / 2}px;`;
  window.form.setNewAddress(true);
  mainPin.addEventListener(`mousedown`, onMainPinActive);
  mainPin.addEventListener(`keydown`, onMainPinActive);
  mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
};

const setActive = () => {
  isActive = true;
  setStateForTags(window.form.adFieldsets, false);
  setStateForTags(window.filterForm.selects, false);
  window.data.map.classList.remove(`map--faded`);
  window.form.add.classList.remove(`ad-form--disabled`);
  window.download.getData();
  window.form.adAddress.readOnly = true;
  window.form.verifyRoomsCapacity();
  window.form.verifyPriceForNight();
  mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  pinsContainer.addEventListener(`click`, window.map.onSmallPinActivated);
  pinsContainer.addEventListener(`keydown`, window.map.onSmallPinActivated);
  window.form.adTypeOfHousing.addEventListener(`change`, window.form.onChangeAdTypeOfHousing);
  window.form.adRoomNumber.addEventListener(`change`, window.form.onChangeAdRoomCapacity);
  window.form.adRoomCapacity.addEventListener(`change`, window.form.onChangeAdRoomCapacity);
  window.form.timeIn.addEventListener(`change`, window.form.onTimeChange);
  window.form.timeOut.addEventListener(`change`, window.form.onTimeChange);
};

const onMainPinMouseDown = (evt) => {
  startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  window.map.pinsContainer.addEventListener(`mousemove`, onMouseMove);
  window.map.pinsContainer.addEventListener(`mouseup`, onMouseUp);
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
  let arrowShift = checkCoordsLimits(shift);
  mainPin.style.top = `${mainPin.offsetTop - arrowShift.y}px`;
  mainPin.style.left = `${mainPin.offsetLeft - arrowShift.x}px`;
};
const checkCoordsLimits = (shift)=>{
  const CoordLimits = {
    minY: 130,
    maxY: 630,
    minX: 0,
    maxX: window.data.map.offsetWidth
  };
  let mainPinStartArrowCoords = {
    y: mainPin.offsetTop + mainPinAllHeight,
    x: mainPin.offsetLeft + mainPin.offsetWidth / 2
  };
  let moveToCoords = {
    x: mainPinStartArrowCoords.x - shift.x,
    y: mainPinStartArrowCoords.y - shift.y
  };
  if (moveToCoords.y < CoordLimits.minY) {
    moveToCoords.y = CoordLimits.minY;
  } else if (moveToCoords.y > CoordLimits.maxY) {
    moveToCoords.y = CoordLimits.maxY;
  }
  if (moveToCoords.x < CoordLimits.minX) {
    moveToCoords.x = CoordLimits.minX;
  } else if (moveToCoords.x > CoordLimits.maxX) {
    moveToCoords.x = CoordLimits.maxX;
  }

  return {
    x: mainPinStartArrowCoords.x - moveToCoords.x,
    y: mainPinStartArrowCoords.y - moveToCoords.y
  };
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
  mainPin.removeEventListener(`mousedown`, onMainPinActive);
};

window.mode = {
  setActive,
  setPassive
};

setPassive();
