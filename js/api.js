'use strict';
(()=>{
  const onLoad = (xhr, onSuccess, onError)=>{
    let error;
    xhr.addEventListener(`error`, ()=>{
      onError(`Запрос не может быть выполнен, ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, ()=>{
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });
    xhr.timeout = 10000;
    switch (xhr.status) {
      case 200:
        onSuccess(xhr.response);
        break;
      case 201:
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
  };
  window.api = {
    onLoad
  };
})();
