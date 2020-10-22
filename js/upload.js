'use strict';
(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  // const URL = `!`;
  const onSubmit = (evt) => {
    evt.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`POST`, URL);
    xhr.send(new FormData(window.form.adForm));
    xhr.addEventListener(`load`, ()=>{
      successMessage();
      window.mode.setPassive();
    });
  };
  window.form.adForm.addEventListener(`submit`, onSubmit);
})();
const onActive = (evt)=>{
  if (evt.button !== window.data.LKM && evt.key !== window.data.BUTTON_ESCAPE) {
    return;
  }
  window.data.map.querySelector(`.success`).remove();
  document.removeEventListener(`keydown`, onActive);
  document.removeEventListener(`click`, onActive);
};
const successMessage = ()=>{
  const messageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const newMessage = messageTemplate.cloneNode(true);
  window.data.map.insertAdjacentElement(`afterbegin`, newMessage);
  document.addEventListener(`keydown`, onActive);
  document.addEventListener(`click`, onActive);
};
