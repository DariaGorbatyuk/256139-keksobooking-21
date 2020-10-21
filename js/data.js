'use strict';
(() =>{
  const LKM = 0;
  const BUTTON_ENTER = `Enter`;
  const BUTTON_ESCAPE = `Escape`;
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);

  window.data = {
    map,
    mainPin,
    LKM,
    BUTTON_ENTER,
    BUTTON_ESCAPE
  };
})();
