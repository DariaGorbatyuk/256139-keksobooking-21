'use strict';
const onMainPinActive = (evt) => {
  if (evt.button !== 0 && evt.key !== `Enter`) {
    return;
  }
  window.data.mainPin.removeEventListener(`click`, onMainPinActive);
  // mainPin.removeEventListener(`keydown`, onMainPinActive);
  window.map.setActiveMode();
};

window.data.mainPin.addEventListener(`click`, onMainPinActive);
// mainPin.addEventListener(`keydown`, onMainPinActive);

window.map.setPassiveMode();

