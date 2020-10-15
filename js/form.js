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
  const MinPriceForNight = {
    bungalow: `0`,
    flat: `1000`,
    house: `5000`,
    palace: `10000`
  };
  const setNewAddress = (isFirstTime) => {
    const mapCoords = window.coords.getCoords(window.data.map);
    let coordsMainPin = window.coords.getCoords(window.data.mainPin);
    let coordsMainPinLeft = coordsMainPin.left - mapCoords.left;
    let y = Math.floor(coordsMainPin.top - mainPinHeight);
    y = checkLimits(y);
    adAddress.value = `${Math.floor(coordsMainPinLeft + mainPinWidth / 2)}, ${y}`;
    if (isFirstTime) {
      y = Math.floor(coordsMainPin.top + mainPinHeight / 2);
      y = checkLimits(y);
      adAddress.value = `${Math.floor(coordsMainPinLeft + mainPinWidth / 2)}, ${y}`;
    }
  };
  const checkLimits = (y)=>{
    const MIN_Y_COORD = 130;
    const MAX_Y_COORD = 630;
    if (y < MIN_Y_COORD) {
      y = MIN_Y_COORD;
    } else if (y > MAX_Y_COORD) {
      y = MAX_Y_COORD;
    }
    return y;
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
