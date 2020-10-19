'use strict';
(()=>{
  const onMainPinClick = (evt) => {
    if (evt.button !== window.data.LKM) {
      return;
    }
    if (!window.mode.isActive) {
      window.mode.setActive();
    }
    window.data.mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
    window.data.mainPin.removeEventListener(`click`, onMainPinClick);
  };
  const onMainPinPressEnter = (evt)=>{
    if (evt.key !== window.data.BUTTON_ENTER) {
      return;
    }
    window.mode.setActive();
    window.data.mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
  };
  window.data.mainPin.addEventListener(`click`, onMainPinClick);
  window.data.mainPin.addEventListener(`keydown`, onMainPinPressEnter);
  window.data.mainPin.addEventListener(`mousedown`, window.moving.onMainPinMouseDown);
  window.mode.setPassive();
})();


