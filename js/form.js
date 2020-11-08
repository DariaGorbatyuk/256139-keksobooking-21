'use strict';
const MIN_PRICE_FOR_NIGHT = {
  bungalow: `0`,
  flat: `1000`,
  house: `5000`,
  palace: `10000`
};
const adForm = document.querySelector(`.ad-form`);
const filter = window.data.map.querySelector(`.map__filters`);
const adFieldsets = adForm.querySelectorAll(`fieldset`);
const adAddress = adForm.querySelector(`#address`);
const adRoomNumber = adForm.querySelector(`#room_number`);
const adRoomCapacity = adForm.querySelector(`#capacity`);
const adTypeOfHousing = adForm.querySelector(`#type`);
const adPriceForNight = adForm.querySelector(`#price`);
const timeIn = adForm.querySelector(`#timein`);
const timeOut = adForm.querySelector(`#timeout`);
const resetButton = adForm.querySelector(`.ad-form__reset`);
const mainPinWidth = window.data.mainPin.offsetWidth;
const mainPinHeight = window.data.mainPin.offsetHeight;

const getCoords = (elem) => {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

const setNewAddress = (isFirstTime) => {
  const mapCoords = getCoords(window.data.map);
  let coordsMainPin = getCoords(window.data.mainPin);
  let coordsMainPinLeft = coordsMainPin.left - mapCoords.left;
  let y = Math.floor(coordsMainPin.top + mainPinHeight + window.data.MAIN_PIN_ARROW);
  let x = Math.floor(coordsMainPinLeft + mainPinWidth / 2);
  adAddress.value = `${x}, ${y}`;
  if (isFirstTime) {
    y = Math.floor(coordsMainPin.top + mainPinHeight / 2);
    adAddress.value = `${x}, ${y}`;
  }
};

const verifyRoomsCapacity = () => {
  if ((adRoomCapacity.value !== `0` && adRoomNumber.value === `100`) || (adRoomNumber.value !== `100` && adRoomCapacity.value === `0`)) {
    adRoomCapacity.setCustomValidity(`не для гостей - 100 комнат`);
  } else if (adRoomCapacity.value > adRoomNumber.value) {
    adRoomCapacity.setCustomValidity(`${adRoomNumber.value} комната/ы — для ${adRoomNumber.value} или меньше гостей`);
  } else {
    adRoomCapacity.setCustomValidity(``);
  }
};
const verifyPriceForNight = () => {
  adPriceForNight.min = MIN_PRICE_FOR_NIGHT[adTypeOfHousing.value];
  adPriceForNight.placeholder = MIN_PRICE_FOR_NIGHT[adTypeOfHousing.value];
};

const setTimeInOut = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};

const onChangeAdRoomCapacity = () => {
  verifyRoomsCapacity();
};
const onChangeAdTypeOfHousing = () => {
  verifyPriceForNight();
};
const onTimeChange = (evt) => {
  setTimeInOut(evt);
};
const deletePinsAndCard = () => {
  let collection = window.data.map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  collection.forEach((item) => {
    item.remove();
  });
  const card = window.data.map.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }
};
const onReset = () => {
  deletePinsAndCard();
  window.mode.setPassive();
  adForm.reset();
  filter.reset();
};

resetButton.addEventListener(`click`, onReset);
window.form = {
  filter,
  adForm,
  adFieldsets,
  adAddress,
  adRoomNumber,
  adRoomCapacity,
  adTypeOfHousing,
  adPriceForNight,
  timeIn,
  timeOut,
  setNewAddress,
  verifyRoomsCapacity,
  verifyPriceForNight,
  setTimeInOut,
  onChangeAdRoomCapacity,
  onChangeAdTypeOfHousing,
  onTimeChange,
  onReset,
  getCoords,
  deletePinsAndCard
};
