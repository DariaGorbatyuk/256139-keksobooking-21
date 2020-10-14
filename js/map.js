'use strict';
(()=>{
  const mainPin = window.data.mainPin;
  const pinsContainer = window.render.pinsContainer;
  const advertisements = window.data.advertisements;
  const setStateForTags = (tags, state) => {
    tags.forEach((item) => {
      item.disabled = state;
    });
  };

  const setPassiveMode = () => {
    const mainPinWidth = mainPin.offsetWidth;
    const mainPinHeight = mainPin.offsetHeight;
    setStateForTags(window.form.adFieldsets, true);
    setStateForTags(window.form.filterSelects, true);
    const coords = window.coords.getCoords(mainPin);
    window.form.adAddress.value = `${Math.floor(coords.left + mainPinWidth / 2)}, ${Math.floor(coords.top + mainPinHeight / 2)}`;
  };

  const setActiveMode = () => {
    setStateForTags(window.form.adFieldsets, false);
    setStateForTags(window.form.filterSelects, false);
    window.data.map.classList.remove(`map--faded`);
    window.form.adForm.classList.remove(`ad-form--disabled`);
    window.render.renderPinsList(advertisements);
    window.form.adAddress.readOnly = true;
    window.form.setNewAddress();
    window.form.verifyRoomsCapacity();
    window.form.verifyPriceForNight();
    pinsContainer.addEventListener(`click`, onSmallPinActive);
    pinsContainer.addEventListener(`keydown`, onSmallPinActive);
    window.form.adTypeOfHousing.addEventListener(`change`, onChangeAdTypeOfHousing);
    window.form.adRoomNumber.addEventListener(`change`, onChangeAdRoomCapacity);
    window.form.adRoomCapacity.addEventListener(`change`, onChangeAdRoomCapacity);
    window.form.timeIn.addEventListener(`change`, onTimeChange);
    window.form.timeOut.addEventListener(`change`, onTimeChange);
  };

  const onSmallPinActive = (evt)=>{
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

  const onChangeAdRoomCapacity = ()=>{
    window.form.verifyRoomsCapacity();
  };
  const onChangeAdTypeOfHousing = ()=>{
    window.form.verifyPriceForNight();
  };
  const onTimeChange = (evt)=>{
    window.form.setTimeInOut(evt);
  };

  window.map = {
    'setPassiveMode': setPassiveMode,
    'setActiveMode': setActiveMode
  };

})();
