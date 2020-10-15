'use strict';
const onMainPinClick = (evt) => {
  if (evt.button !== 0) {
    return;
  }
  if (!window.mods.isActiveTrue) {
    window.mods.setActiveMode();
  }
  window.moving.recalculateCoords(evt, window.data.mainPin, window.render.pinsContainer);
  window.data.mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
};
const onMainPinPressEnter = (evt)=>{
  if (evt.key !== `Enter`) {
    return;
  }
  window.mods.setActiveMode();
  window.data.mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
};
window.data.mainPin.addEventListener(`mousedown`, onMainPinClick);
window.data.mainPin.addEventListener(`keydown`, onMainPinPressEnter);
window.mods.setPassiveMode();

