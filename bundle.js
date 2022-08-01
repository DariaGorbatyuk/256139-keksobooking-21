/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!********************!*\
  !*** ./js/data.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const LEFT_MOUSE_BUTTON = 0;
const BUTTON_ENTER = `Enter`;
const BUTTON_ESCAPE = `Escape`;
const MAIN_PIN_ARROW = 18;
const map = document.querySelector(`.map`);
const mainPin = map.querySelector(`.map__pin--main`);

window.data = {
  map,
  mainPin,
  LEFT_MOUSE_BUTTON,
  BUTTON_ENTER,
  BUTTON_ESCAPE,
  MAIN_PIN_ARROW
};

})();

(() => {
/*!*******************!*\
  !*** ./js/api.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

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

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const get = (advertisement, i) => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let newPin = pinTemplate.cloneNode(true);
  const pinImg = newPin.querySelector(`img`);
  newPin.style = `left: ${advertisement.location.x - PIN_WIDTH / 2}px; top: ${advertisement.location.y - PIN_HEIGHT}px`;
  newPin.dataset.id = i;
  pinImg.src = advertisement.author.avatar;
  pinImg.alt = advertisement.offer.title;
  return newPin;
};
window.pin = {
  get
};

})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const ApartmentsType = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
const fillPhotos = (advertisement, newCard) => {
  const photos = newCard.querySelector(`.popup__photos`);
  const photo = photos.querySelector(`.popup__photo`);
  if (advertisement.offer.photos.length === 0) {
    photo.remove();
  } else {
    photo.src = advertisement.offer.photos[0];
  }
  const fragment = document.createDocumentFragment();
  advertisement.offer.photos.forEach((advertPhoto) => {
    let newPhoto = photo.cloneNode();
    newPhoto.src = advertPhoto;
    fragment.appendChild(newPhoto);
  });
  photos.appendChild(fragment);
};

const fillFeatures = (advertisement, newCard) => {
  const features = newCard.querySelectorAll(`.popup__feature`);
  features.forEach((feature)=>{
    let res = advertisement.offer.features.some((chosenFeature)=>{
      return feature.className.endsWith(`--${chosenFeature}`);
    });
    if (!res) {
      feature.remove();
    }
  });
};
const get = (advertisement) => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
  let newCard = cardTemplate.cloneNode(true);
  newCard.querySelector(`.popup__title`).textContent = advertisement.offer.title;
  newCard.querySelector(`.popup__text--address`).textContent = advertisement.offer.address;
  newCard.querySelector(`.popup__text--price`).textContent = `${advertisement.offer.price}р/ночь`;
  newCard.querySelector(`.popup__type`).textContent = ApartmentsType[advertisement.offer.type];
  newCard.querySelector(`.popup__text--capacity`).textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
  newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
  newCard.querySelector(`.popup__description`).textContent = advertisement.offer.description;
  newCard.querySelector(`.popup__avatar`).src = advertisement.author.avatar;
  fillFeatures(advertisement, newCard);
  fillPhotos(advertisement, newCard);
  return newCard;
};

window.card = {
  get
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const MIN_PRICE_FOR_NIGHT = {
  bungalow: `0`,
  flat: `1000`,
  house: `5000`,
  palace: `10000`
};
const add = document.querySelector(`.ad-form`);
const filter = window.data.map.querySelector(`.map__filters`);
const adFieldsets = add.querySelectorAll(`fieldset`);
const adAddress = add.querySelector(`#address`);
const adRoomNumber = add.querySelector(`#room_number`);
const adRoomCapacity = add.querySelector(`#capacity`);
const adTypeOfHousing = add.querySelector(`#type`);
const adPriceForNight = add.querySelector(`#price`);
const timeIn = add.querySelector(`#timein`);
const timeOut = add.querySelector(`#timeout`);
const resetButton = add.querySelector(`.ad-form__reset`);
const mainPinWidth = window.data.mainPin.offsetWidth;
const mainPinHeight = window.data.mainPin.offsetHeight;

const getCoords = (elem) => {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

const setNewAddress = (isFirstTime) => {
  const mapCoords = getCoords(window.data.map);
  let coordsMainPin = getCoords(window.data.mainPin);
  let coordsMainPinLeft = coordsMainPin.left - mapCoords.left;
  let y = Math.floor(coordsMainPin.top + mainPinHeight + window.data.MAIN_PIN_ARROW);
  let x = Math.floor(coordsMainPinLeft + mainPinWidth / 2);
  adAddress.value = `${x}, ${y}`;
  if (isFirstTime) {
    y = Math.floor(coordsMainPin.top + mainPinHeight / 2);
    adAddress.value = `${x}, ${y}`;
  }
};

const verifyRoomsCapacity = () => {
  if ((adRoomCapacity.value !== `0` && adRoomNumber.value === `100`) || (adRoomNumber.value !== `100` && adRoomCapacity.value === `0`)) {
    adRoomCapacity.setCustomValidity(`не для гостей - 100 комнат`);
  } else if (adRoomCapacity.value > adRoomNumber.value) {
    adRoomCapacity.setCustomValidity(`${adRoomNumber.value} комната/ы — для ${adRoomNumber.value} или меньше гостей`);
  } else {
    adRoomCapacity.setCustomValidity(``);
  }
};
const verifyPriceForNight = () => {
  adPriceForNight.min = MIN_PRICE_FOR_NIGHT[adTypeOfHousing.value];
  adPriceForNight.placeholder = MIN_PRICE_FOR_NIGHT[adTypeOfHousing.value];
};

const setTimeInOut = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};

const onChangeAdRoomCapacity = () => {
  verifyRoomsCapacity();
};
const onChangeAdTypeOfHousing = () => {
  verifyPriceForNight();
};
const onTimeChange = (evt) => {
  setTimeInOut(evt);
};
const deletePinsAndCard = () => {
  let collection = window.data.map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  collection.forEach((item) => {
    item.remove();
  });
  const card = window.data.map.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }
};
const onReset = () => {
  deletePinsAndCard();
  add.reset();
  filter.reset();
  window.mode.setPassive();
  window.preview.previewAvatar.src = `img/muffin-grey.svg`;
  if (window.preview.previewAdverb.firstChild) {
    window.preview.previewAdverb.firstChild.remove();
  }
};

resetButton.addEventListener(`click`, onReset);
window.form = {
  filter,
  add,
  adFieldsets,
  adAddress,
  adRoomNumber,
  adRoomCapacity,
  adTypeOfHousing,
  adPriceForNight,
  timeIn,
  timeOut,
  setNewAddress,
  verifyRoomsCapacity,
  verifyPriceForNight,
  setTimeInOut,
  onChangeAdRoomCapacity,
  onChangeAdTypeOfHousing,
  onTimeChange,
  onReset,
  getCoords,
  deletePinsAndCard
};

})();

(() => {
/*!***********************!*\
  !*** ./js/preview.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const fileChooserAvatar = window.form.add.querySelector(`.ad-form__field input[type=file]`);
const previewAvatar = window.form.add.querySelector(`.ad-form-header__preview img`);
const fileChooserAdverb = window.form.add.querySelector(`.ad-form__upload input[type=file]`);
const previewAdverb = window.form.add.querySelector(`.ad-form__photo`);

const onLoadImg = (input, preview)=>{
  let file = input.files[0];
  let fileType = file.type;
  let matches = FILE_TYPES.some((type)=> {
    return fileType.endsWith(type);
  });
  if (!matches) {
    return;
  }
  let reader = new FileReader();
  reader.addEventListener(`load`, ()=> {
    if (preview.src) {
      preview.src = reader.result;
    } else {
      let img = preview.querySelector(`img`);
      if (img) {
        img.remove();
      }
      preview.style = `display: flex; align-items: center; justify-content: center;`;
      img = document.createElement(`img`);
      img.src = reader.result;
      img.style = `max-width: 100%;`;
      preview.appendChild(img);
    }
  });
  reader.readAsDataURL(file);

};
fileChooserAvatar.addEventListener(`change`, onLoadImg.bind(null, fileChooserAvatar, previewAvatar));
fileChooserAdverb.addEventListener(`change`, onLoadImg.bind(null, fileChooserAdverb, previewAdverb));

window.preview = {
  previewAvatar,
  previewAdverb
};

})();

(() => {
/*!***************************!*\
  !*** ./js/filter-form.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const FILTER_DELAY = 500;
const filterForm = window.form.filter;
const selects = filterForm.querySelectorAll(`select`);
const housingType = filterForm.querySelector(`#housing-type`);
const housingPrice = filterForm.querySelector(`#housing-price`);
const housingRooms = filterForm.querySelector(`#housing-rooms`);
const housingGuests = filterForm.querySelector(`#housing-guests`);
const wifi = filterForm.querySelector(`#filter-wifi`);
const dishWasher = filterForm.querySelector(`#filter-dishwasher`);
const parking = filterForm.querySelector(`#filter-parking`);
const washer = filterForm.querySelector(`#filter-washer`);
const elevator = filterForm.querySelector(`#filter-elevator`);
const conditioner = filterForm.querySelector(`#filter-conditioner`);
let lastTimeout;
const filters = [
  {
    name: `type`,
    node: housingType,
    selected: false
  },
  {
    name: `price`,
    node: housingPrice,
    selected: false
  },
  {
    name: `rooms`,
    node: housingRooms,
    selected: false
  },
  {
    name: `guests`,
    node: housingGuests,
    selected: false
  },
  {
    name: `features`,
    nodes: [wifi, dishWasher, parking, washer, elevator, conditioner],
    selected: false
  }
];
const getPrice = (price) => {
  if (price <= MIN_PRICE) {
    return `low`;
  } else if (MIN_PRICE < price && price < MAX_PRICE) {
    return `middle`;
  } else {
    return `high`;
  }
};

const checkSelected = (keys) => { // переписать через some
  keys.forEach((key) => {
    if (key.name === `features`) {
      key.selected = key.nodes.some((feature)=>{
        return feature.checked;
      });
    } else {
      key.selected = key.node.value !== `any`;
    }
  });
};

const getCheckedFeatures = (features)=>{
  return features.nodes.filter((feature) => {
    return feature.checked;
  });
};
const filterByFeatures = (features, advValue)=>{
  let chosenFeatures = getCheckedFeatures(features);
  let containedFeatures = chosenFeatures.filter((feature)=>{
    return advValue.includes(feature.value);
  });
  return containedFeatures.length === chosenFeatures.length;
};
const checkAdvert = (advert, selectedFilters)=>{
  return selectedFilters.every((filter)=>{
    let advValue = filter.name === `price` ? getPrice(advert.offer[filter.name]) : advert.offer[filter.name];
    switch (filter.name) {
      case (`features`):
        return filterByFeatures(filter, advValue);
      default:
        return filter.node.value === advValue.toString();
    }
  });
};
const getNewAdverts = (adverts, selectedFilters) => {
  return adverts.filter((item) => {
    return checkAdvert(item, selectedFilters);
  });
};
const updateAdverts = ()=>{
  checkSelected(filters);
  let selectedFilters = filters.filter((filter) => {
    return filter.selected;
  });
  let adverts = window.download.advertisements;
  if (selectedFilters.length !== 0) {
    adverts = getNewAdverts(adverts, selectedFilters);
  }
  window.form.deletePinsAndCard();
  window.map.renderPinsList(adverts);
  window.filterForm.advertisements = adverts;
};
const onFilterChange = () => {
  if (lastTimeout) {
    clearTimeout(lastTimeout);
  }
  lastTimeout = setTimeout(updateAdverts, FILTER_DELAY);

};
filterForm.addEventListener(`change`, onFilterChange);


window.filterForm = {
  selects
};

})();

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

let MAX_PIN_COUNT = 5;
const map = window.data.map;
const pinsContainer = map.querySelector(`.map__pins`);


const renderPinsList = (advertisements) => {
  const fragment = document.createDocumentFragment();
  let count = advertisements.length < 5 ? advertisements.length : MAX_PIN_COUNT;
  for (let i = 0; i < count; i++) {
    if (advertisements[i].offer) {
      let pin = window.pin.get(advertisements[i], i);
      fragment.appendChild(pin);
    }
  }
  pinsContainer.appendChild(fragment);
};
const renderCard = (advertisement) => {
  const newCard = window.card.get(advertisement);
  const cardClose = newCard.querySelector(`.popup__close`);
  map.insertBefore(newCard, map.querySelector(`.map__filters-container`));
  cardClose.addEventListener(`click`, onPopupClose);
  document.addEventListener(`keydown`, onPopupClose);
};

const onSmallPinActivated = (evt) => {
  let indexAdv;
  if (evt.key !== window.data.BUTTON_ENTER && evt.button !== window.data.LEFT_MOUSE_BUTTON) {
    return;
  }
  if (evt.target.parentNode.type !== `button` && evt.target.type !== `button`) {
    return;
  }
  const mapCard = window.data.map.querySelector(`.map__card `);
  if (mapCard) {
    mapCard.remove();
  }
  removeClassPinActive();
  if (evt.target.dataset.id) {
    indexAdv = evt.target.dataset.id;
    evt.target.classList.add(`map__pin--active`);
  } else {
    indexAdv = evt.target.parentNode.dataset.id;
    evt.target.parentNode.classList.add(`map__pin--active`);
  }
  let adv = window.download.advertisements;
  if (window.filterForm.advertisements) {
    adv = window.filterForm.advertisements;
  }
  window.map.renderCard(adv[indexAdv]);
};

const onPopupClose = (evt) => {
  if (evt.key !== window.data.BUTTON_ESCAPE && evt.button !== window.data.LEFT_MOUSE_BUTTON) {
    return;
  }
  map.querySelector(`.map__card `).remove();
  removeClassPinActive();
  document.removeEventListener(`keydown`, onPopupClose);
};
const removeClassPinActive = ()=>{
  let pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((pin)=>{
    pin.classList.remove(`map__pin--active`);
  });
};

window.map = {
  renderPinsList,
  renderCard,
  pinsContainer,
  onSmallPinActivated
};

})();

(() => {
/*!************************!*\
  !*** ./js/download.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const TIMEOUT = 5000;
const LINK = `https://25.javascript.pages.academy/keksobooking/data`;

const onSuccess = (data) => {
  // debugger;
  window.download.advertisements = data;
  window.map.renderPinsList(data);
};
const onError = (error) => {
  let node = document.createElement(`div`);
  node.style = `z-index: 100; text-align: center; background-color: gold; position: absolute; left: 0; right: 0; top: 280px; font-size: 25px;`;
  node.textContent = error;
  window.data.map.insertAdjacentElement(`afterbegin`, node);
};

const loadData = ()=>{
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, window.api.onLoad.bind(null, xhr, onSuccess, onError));
  xhr.addEventListener(`error`, () => {
    onError(`Запрос не может быть выполнен, ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });
  xhr.open(`GET`, LINK);
  xhr.send();
  xhr.timeout = TIMEOUT;
};

window.download = {
  advertisements: [],
  TIMEOUT,
  loadData
};


})();

(() => {
/*!********************!*\
  !*** ./js/mode.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const pinsContainer = window.map.pinsContainer;
const map = window.data.map;
const mainPin = window.data.mainPin;
const mainPinAllHeight = mainPin.offsetHeight + window.data.MAIN_PIN_ARROW;
const mapWidth = map.offsetWidth;
const mapHeight = map.offsetHeight;
let isActive;
let startCoords = {x: 0, y: 0};

const setStateForTags = (tags, state) => {
  tags.forEach((item) => {
    item.disabled = state;
  });
};
const setPassive = () => {
  isActive = false;
  window.data.map.classList.add(`map--faded`);
  window.form.add.classList.add(`ad-form--disabled`);
  setStateForTags(window.form.adFieldsets, true);
  setStateForTags(window.filterForm.selects, true);
  mainPin.style = `left: ${(mapWidth - mainPin.offsetWidth) / 2}px; top: ${mapHeight / 2}px;`;
  window.form.setNewAddress(true);
  mainPin.addEventListener(`mousedown`, onMainPinActive);
  mainPin.addEventListener(`keydown`, onMainPinActive);
  mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
};

const setActive = () => {
  isActive = true;
  setStateForTags(window.form.adFieldsets, false);
  setStateForTags(window.filterForm.selects, false);
  window.data.map.classList.remove(`map--faded`);
  window.form.add.classList.remove(`ad-form--disabled`);
  window.download.loadData();
  window.form.adAddress.readOnly = true;
  window.form.verifyRoomsCapacity();
  window.form.verifyPriceForNight();
  mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  pinsContainer.addEventListener(`click`, window.map.onSmallPinActivated);
  pinsContainer.addEventListener(`keydown`, window.map.onSmallPinActivated);
  window.form.adTypeOfHousing.addEventListener(`change`, window.form.onChangeAdTypeOfHousing);
  window.form.adRoomNumber.addEventListener(`change`, window.form.onChangeAdRoomCapacity);
  window.form.adRoomCapacity.addEventListener(`change`, window.form.onChangeAdRoomCapacity);
  window.form.timeIn.addEventListener(`change`, window.form.onTimeChange);
  window.form.timeOut.addEventListener(`change`, window.form.onTimeChange);
};

const onMainPinMouseDown = (evt) => {
  startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  window.map.pinsContainer.addEventListener(`mousemove`, onMouseMove);
  window.map.pinsContainer.addEventListener(`mouseup`, onMouseUp);
};

const onMouseMove = (moveEvt) => {
  moveEvt.preventDefault();

  let shift = {
    x: startCoords.x - moveEvt.clientX,
    y: startCoords.y - moveEvt.clientY
  };

  startCoords = {
    x: moveEvt.clientX,
    y: moveEvt.clientY
  };
  let arrowShift = checkCoordsLimits(shift);
  mainPin.style.top = `${mainPin.offsetTop - arrowShift.y}px`;
  mainPin.style.left = `${mainPin.offsetLeft - arrowShift.x}px`;
};
const checkCoordsLimits = (shift)=>{
  const CoordLimits = {
    minY: 130,
    maxY: 630,
    minX: 0,
    maxX: window.data.map.offsetWidth
  };
  let mainPinStartArrowCoords = {
    y: mainPin.offsetTop + mainPinAllHeight,
    x: mainPin.offsetLeft + mainPin.offsetWidth / 2
  };
  let moveToCoords = {
    x: mainPinStartArrowCoords.x - shift.x,
    y: mainPinStartArrowCoords.y - shift.y
  };
  if (moveToCoords.y < CoordLimits.minY) {
    moveToCoords.y = CoordLimits.minY;
  } else if (moveToCoords.y > CoordLimits.maxY) {
    moveToCoords.y = CoordLimits.maxY;
  }
  if (moveToCoords.x < CoordLimits.minX) {
    moveToCoords.x = CoordLimits.minX;
  } else if (moveToCoords.x > CoordLimits.maxX) {
    moveToCoords.x = CoordLimits.maxX;
  }

  return {
    x: mainPinStartArrowCoords.x - moveToCoords.x,
    y: mainPinStartArrowCoords.y - moveToCoords.y
  };
};
const onMouseUp = (upEvt) => {
  upEvt.preventDefault();
  window.form.setNewAddress(false);
  window.map.pinsContainer.removeEventListener(`mousemove`, onMouseMove);
  window.map.pinsContainer.removeEventListener(`mouseup`, onMouseUp);
};
const onMainPinActive = (evt) => {
  if (evt.button !== window.data.LEFT_MOUSE_BUTTON && evt.key !== window.data.BUTTON_ENTER) {
    return;
  }
  if (!isActive) {
    setActive();
  }
  mainPin.removeEventListener(`keydown`, onMainPinActive);
  mainPin.removeEventListener(`mousedown`, onMainPinActive);
};

window.mode = {
  setActive,
  setPassive
};

setPassive();

})();

(() => {
/*!**********************!*\
  !*** ./js/upload.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

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


})();

/******/ })()
;
