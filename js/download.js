'use strict';
(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  const onSuccess = (data) => {
    window.download.advertisements = data;
  };
  const onError = (error) => {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; text-align: center; background-color: gold; position: absolute; left: 0; right: 0; top: 280px; font-size: 25px;`;
    node.textContent = error;
    window.data.map.insertAdjacentElement(`afterbegin`, node);
  };
  xhr.open(`GET`, URL);
  xhr.send();
  xhr.addEventListener(`load`, window.api.onLoad.bind(null, xhr, onSuccess, onError));
  xhr.addEventListener(`error`, () => {
    onError(`Запрос не может быть выполнен, ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });
  xhr.timeout = 5000;
  window.download = {
    advertisements: undefined
  };

})();
