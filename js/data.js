'use strict';
(() =>{
  const LEFT_MOUSE_BUTTON = 0;
  const BUTTON_ENTER = `Enter`;
  const BUTTON_ESCAPE = `Escape`;
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);

  window.data = {
    map,
    mainPin,
    LEFT_MOUSE_BUTTON,
    BUTTON_ENTER,
    BUTTON_ESCAPE
  };
})();
