'use strict';
const main = document.querySelector(`main`);
const LINK = `https://21.javascript.pages.academy/keksobooking`;
let removeTarget;

const onRemoveMessage = (target, evt) => {
  if (evt.button !== window.data.LEFT_MOUSE_BUTTON && evt.key !== window.data.BUTTON_ESCAPE) {
    return;
  }
  target.remove();
  document.removeEventListener(`keydown`, onRemoveMessage.bind(null, removeTarget));
  document.removeEventListener(`click`, onRemoveMessage.bind(null, removeTarget));
};
const successMessage = () => {
  const messageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const newMessage = messageTemplate.cloneNode(true);
  main.insertAdjacentElement(`afterbegin`, newMessage);
  removeTarget = newMessage;
  document.addEventListener(`keydown`, onRemoveMessage.bind(null, removeTarget));
  document.addEventListener(`click`, onRemoveMessage.bind(null, removeTarget));
};
const onSuccess = () => {
  window.form.onReset();
  successMessage();
};
const onError = () => {

  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  let newError = errorTemplate.cloneNode(true);
  main.insertAdjacentElement(`afterbegin`, newError);
  removeTarget = newError;
  newError.querySelector(`.error__button`).addEventListener(`click`, onRemoveMessage.bind(null, removeTarget));
  document.addEventListener(`keydown`, onRemoveMessage.bind(null, removeTarget));
  document.addEventListener(`click`, onRemoveMessage.bind(null, removeTarget));
};

const onSubmit = (evt) => {
  evt.preventDefault();
  let xhr = new XMLHttpRequest();
  xhr.addEventListener(`load`, window.api.onLoad.bind(null, xhr, onSuccess, onError));
  xhr.addEventListener(`error`, () => {
    onError(`Запрос не может быть выполнен, ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });
  xhr.timeout = window.download.TIMEOUT;
  xhr.open(`POST`, LINK);
  xhr.send(new FormData(window.form.add));

};

window.form.add.addEventListener(`submit`, onSubmit);

