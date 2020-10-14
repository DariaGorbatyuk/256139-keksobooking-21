'use strict';
(()=>{
  const adForm = document.querySelector(`.ad-form`);
  const filterForm = window.data.map.querySelector(`.map__filters`);
  const adFieldsets = adForm.querySelectorAll(`fieldset`);
  const filterSelects = filterForm.querySelectorAll(`select`);
  const adAddress = adForm.querySelector(`#address`);
  const adRoomNumber = adForm.querySelector(`#room_number`);
  const adRoomCapacity = adForm.querySelector(`#capacity`);
  const adTypeOfHousing = adForm.querySelector(`#type`);
  const adPriceForNight = adForm.querySelector(`#price`);
  const timeIn = adForm.querySelector(`#timein`);
  const timeOut = adForm.querySelector(`#timeout`);
  const mainPinWidth = window.data.mainPin.offsetWidth;
  const mainPinHeight = window.data.mainPin.offsetHeight;
  const MAIN_PIN_ARROW = 22; // это надо как то исправить
  const MinPriceForNight = {
    bungalow: `0`,
    flat: `1000`,
    house: `5000`,
    palace: `10000`
  };
  const setNewAddress = () => {
    const coords = window.coords.getCoords(window.data.mainPin);
    adAddress.value = `${Math.floor(coords.left + mainPinWidth / 2)}, ${Math.floor(coords.top + mainPinHeight / 2 + MAIN_PIN_ARROW)}`;
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
    adPriceForNight.setAttribute(`min`, MinPriceForNight[adTypeOfHousing.value]);
    adPriceForNight.setAttribute(`placeholder`, MinPriceForNight[adTypeOfHousing.value]);
  };

  const setTimeInOut = (evt)=>{
    timeIn.value = evt.target.value;
    timeOut.value = evt.target.value;
  };

  const onChangeAdRoomCapacity = ()=>{
    window.form.verifyRoomsCapacity();
  };
  const onChangeAdTypeOfHousing = ()=>{
    window.form.verifyPriceForNight();
  };
  const onTimeChange = (evt)=>{
    window.form.setTimeInOut(evt);
  };
  window.form = {
    'setNewAddress': setNewAddress,
    'verifyRoomsCapacity': verifyRoomsCapacity,
    'verifyPriceForNight': verifyPriceForNight,
    'setTimeInOut': setTimeInOut,
    'adForm': adForm,
    'filterForm': filterForm,
    'adFieldsets': adFieldsets,
    'adAddress': adAddress,
    'adRoomNumber': adRoomNumber,
    'adRoomCapacity': adRoomCapacity,
    'adTypeOfHousing': adTypeOfHousing,
    'adPriceForNight': adPriceForNight,
    'filterSelects': filterSelects,
    'timeIn': timeIn,
    'timeOut': timeOut,
    'onChangeAdRoomCapacity': onChangeAdRoomCapacity,
    'onChangeAdTypeOfHousing': onChangeAdTypeOfHousing,
    'onTimeChange': onTimeChange
  };
})();
