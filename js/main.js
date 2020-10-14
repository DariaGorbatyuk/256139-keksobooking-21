'use strict';
const onMainPinActive = (evt) => {
  if (evt.button !== 0 && evt.key !== `Enter`) {
    return;
  }
  window.data.mainPin.removeEventListener(`click`, onMainPinActive);
  window.mods.setActiveMode();
};
window.data.mainPin.addEventListener(`click`, onMainPinActive);
window.mods.setPassiveMode();

