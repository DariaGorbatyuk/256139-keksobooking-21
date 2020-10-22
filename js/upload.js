'use strict';
(() => {
  const main = document.querySelector(`main`);
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const onErrorActive = (evt) => {
    if (evt.button !== window.data.LEFT_MOUSE_BUTTON && evt.key !== window.data.BUTTON_ESCAPE) {
      return;
    }
    document.querySelector(`.error`).remove();
    document.removeEventListener(`keydown`, onErrorActive);
    document.removeEventListener(`click`, onErrorActive);
  };
  const onSuccess = () => {
    window.form.deletePinsAndCard();
    window.mode.setPassive();
    window.form.adForm.reset();
    successMessage();
  };
  const onError = () => {
    const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    let newError = errorTemplate.cloneNode(true);
    main.insertAdjacentElement(`afterbegin`, newError);
    newError.addEventListener(`click`, onErrorActive);
    document.addEventListener(`keydown`, onErrorActive);
    document.addEventListener(`click`, onErrorActive);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open(`POST`, URL);
    xhr.send(new FormData(window.form.adForm));
    xhr.addEventListener(`load`, onSuccess); // на load надо убирать eventlistener?
    xhr.addEventListener(`error`, onError);
    xhr.addEventListener(`timeout`, onError);
    xhr.timeout = 5000;
  };
  const onActive = (evt) => {
    if (evt.button !== window.data.LEFT_MOUSE_BUTTON && evt.key !== window.data.BUTTON_ESCAPE) {
      return;
    }
    main.querySelector(`.success`).remove();
    document.removeEventListener(`keydown`, onActive);
    document.removeEventListener(`click`, onActive);
  };
  const successMessage = () => {
    const messageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const newMessage = messageTemplate.cloneNode(true);
    main.insertAdjacentElement(`afterbegin`, newMessage);
    document.addEventListener(`keydown`, onActive);
    document.addEventListener(`click`, onActive);
  };
  window.form.adForm.addEventListener(`submit`, onSubmit);
})();

