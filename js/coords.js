'use strict';
(()=>{
  const getCoords = (elem) => {
    let box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };
  window.coords = {
    'getCoords': getCoords
  };
})();
