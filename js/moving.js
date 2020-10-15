'use strict';
(()=>{
  const recalculateCoords = (evt, target, container)=>{
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
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
      target.style.top = `${target.offsetTop - shift.y}px`;
      target.style.left = `${target.offsetLeft - shift.x}px`;
    };
    const onMouseUp = (upEvt)=>{
      upEvt.preventDefault();
      container.removeEventListener(`mousemove`, onMouseMove);
      container.removeEventListener(`mouseup`, onMouseUp);
    };

    container.addEventListener(`mousemove`, onMouseMove);
    container.addEventListener(`mouseup`, onMouseUp);
  };
  window.moving = {
    'recalculateCoords': recalculateCoords
  };

})();
