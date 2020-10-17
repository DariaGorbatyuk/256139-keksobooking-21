'use strict';
(()=>{
  const MAIN_PIN_ARROW = 18;
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
  const minPriceForNight = {
    bungalow: `0`,
    flat: `1000`,
    house: `5000`,
    palace: `10000`
  };

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
    let y = Math.floor(coordsMainPin.top + mainPinHeight + MAIN_PIN_ARROW);
    let x = Math.floor(coordsMainPinLeft + mainPinWidth / 2);
    let coords = checkLimits(x, y);
    adAddress.value = `${coords.x}, ${coords.y}`;
    if (isFirstTime) {
      y = Math.floor(coordsMainPin.top + mainPinHeight / 2);
      coords = checkLimits(x, y);
      adAddress.value = `${coords.x}, ${coords.y}`;
    }
  };
  const checkLimits = (x, y)=>{
    const limits = {
      minYCoord: 130,
      maxYCoord: 630,
      minXCoord: 0,
      maxXCoord: window.data.map.offsetWidth
    };
    if (y < limits.minYCoord) {
      y = limits.minYCoord;
    } else if (y > limits.maxYCoord) {
      y = limits.maxYCoord;
    }
    if (x < limits.minXCoord) {
      x = limits.minXCoord;
    } else if (x > limits.maxXCoord) {
      x = limits.maxXCoord;
    }
    return {
      'x': x,
      'y': y
    };
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
    adPriceForNight.setAttribute(`min`, minPriceForNight[adTypeOfHousing.value]);
    adPriceForNight.setAttribute(`placeholder`, minPriceForNight[adTypeOfHousing.value]);
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
