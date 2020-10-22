'use strict';
(()=>{
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const onSubmit = (evt)=>{
    evt.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open(`POST`, URL);
    xhr.send(new FormData(window.form.adForm));
  };
  window.form.adForm.addEventListener(`submit`, onSubmit);
})();
