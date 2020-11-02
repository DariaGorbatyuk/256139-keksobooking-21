'use strict';
(() => {
  const Code = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };
  const onLoad = (xhr, onSuccess, onError) => {
    let error;
    switch (xhr.status) {
      case Code.OK:
        onSuccess(xhr.response);
        break;
      case Code.CREATED:
        onSuccess(xhr.response);
        break;
      case Code.BAD_REQUEST:
        error = `Неверный запрос`;
        break;
      case Code.UNAUTHORIZED:
        error = `Пользователь не авторизован`;
        break;
      case Code.NOT_FOUND:
        error = `Запрашиваемый ресурс не найден`;
        break;
      case Code.SERVER_ERROR:
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
