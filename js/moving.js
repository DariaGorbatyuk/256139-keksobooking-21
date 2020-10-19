'use strict';
(()=>{
  const pinsContainer = window.map.pinsContainer;
  const mainPin = window.data.mainPin;
  const onMainPinMouseDown = ()=>{
    let startCoords = recalculateCoords();
    pinsContainer.addEventListener(`mousemove`, onMouseMove);
    pinsContainer.addEventListener(`mouseup`, onMouseUp);
  };
  const recalculateCoords = (evt)=>{
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
    target.style.top = `${target.offsetTop - shift.y}px`;
    target.style.left = `${target.offsetLeft - shift.x}px`;
  };
  /* const recalculateCoords = (evt, target, container)=>{
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
      window.form.setNewAddress(false);
      container.removeEventListener(`mousemove`, onMouseMove);
      container.removeEventListener(`mouseup`, onMouseUp);
    };

    container.addEventListener(`mousemove`, onMouseMove);
    container.addEventListener(`mouseup`, onMouseUp);
  };*/
  window.moving = {
    onMainPinMouseDown
  };

})();
