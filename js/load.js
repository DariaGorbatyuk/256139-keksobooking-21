'use strict';
(()=>{
  // const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL = `!`;
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  const onSuccess = (data)=>{
    window.load = {
      advertisements: data
    };
  };
  const onError = (error)=>{
    console.error(error);
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; background-color: gold; position: absolute; left: 0; right: 0`;
    node.style.fontSize = `30px`;
    node.textContent = error;
    window.data.map.insertAdjacentElement(`afterbegin`, node);
  };
  xhr.addEventListener(`load`, ()=>{
    let error;
    switch (xhr.status) {
      case 200:
        onSuccess(xhr.response);
        break;
      case 400:
        error = `Неверный запрос`;
        break;
      case 401:
        error = `Пользователь не авторизован`;
        break;
      case 404:
        error = `Запрашиваемый ресурс не найден`;
        break;
      case 500:
        error = `Внутренняя ошибка сервера`;
        break;
      default:
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
    }
    if (error) {
      onError(error);
    }
    xhr.addEventListener(`error`, ()=>{
      onError(`Запрос не может быть выполнен, ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, ()=>{
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });
    xhr.timeout = 1000;
  });

  xhr.open(`GET`, URL);
  xhr.send();

})();
