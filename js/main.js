'use strict';
(()=>{
  const onMainPinClick = (evt) => {
    if (evt.button !== 0) {
      return;
    }
    if (!window.mode.isActiveTrue) {
      window.mode.setActive();
    }
    window.moving.recalculateCoords(evt, window.data.mainPin, window.render.pinsContainer);
    window.data.mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
  };
  const onMainPinPressEnter = (evt)=>{
    if (evt.key !== `Enter`) {
      return;
    }
    window.mode.setActive();
    window.data.mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
  };
  window.data.mainPin.addEventListener(`mousedown`, onMainPinClick);
  window.data.mainPin.addEventListener(`keydown`, onMainPinPressEnter);
  window.mode.setPassive();
})();


