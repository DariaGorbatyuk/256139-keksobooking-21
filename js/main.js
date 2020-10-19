'use strict';
(()=>{
  let startCoords = {x: 0, y: 0};

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

  window.data.mainPin.addEventListener(`click`, onMainPinActive);
  window.data.mainPin.addEventListener(`keydown`, onMainPinActive);
  window.data.mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  window.mode.setPassive();
})();


