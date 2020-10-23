'use strict';
(() => {
  const main = document.querySelector(`main`);
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const onErrorClose = (evt) => { // убрать одинаковые фукции
    if (evt.button !== window.data.LEFT_MOUSE_BUTTON && evt.key !== window.data.BUTTON_ESCAPE) {
      return;
    }
    document.querySelector(`.error`).remove();
    document.removeEventListener(`keydown`, onErrorClose);
    document.removeEventListener(`click`, onErrorClose);
  };
  const onSuccess = () => {
    window.form.onReset();
    successMessage();
  };
  const onError = () => {
    const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    let newError = errorTemplate.cloneNode(true);
    main.insertAdjacentElement(`afterbegin`, newError);
    newError.querySelector(`.error__button`).addEventListener(`click`, onErrorClose);
    document.addEventListener(`keydown`, onErrorClose);
    document.addEventListener(`click`, onErrorClose);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open(`POST`, URL);
    xhr.send(new FormData(window.form.adForm));
    xhr.addEventListener(`load`, window.api.onLoad.bind(null, xhr, onSuccess, onError));
    xhr.timeout = 5000;
  };
  const onRemoveSucccessMessage = (evt) => {
    if (evt.button !== window.data.LEFT_MOUSE_BUTTON && evt.key !== window.data.BUTTON_ESCAPE) {
      return;
    }
    main.querySelector(`.success`).remove();
    document.removeEventListener(`keydown`, onRemoveSucccessMessage);
    document.removeEventListener(`click`, onRemoveSucccessMessage);
  };
  const successMessage = () => {
    const messageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const newMessage = messageTemplate.cloneNode(true);
    main.insertAdjacentElement(`afterbegin`, newMessage);
    document.addEventListener(`keydown`, onRemoveSucccessMessage);
    document.addEventListener(`click`, onRemoveSucccessMessage);
  };

  window.form.adForm.addEventListener(`submit`, onSubmit);
})();

