'use strict';
const MAIN_PIN_ARROW = 22;
const map = document.querySelector(`.map`);
const adForm = document.querySelector(`.ad-form`);
const filterForm = map.querySelector(`.map__filters`);
const adFieldsets = adForm.querySelectorAll(`fieldset`);
const filterSelects = filterForm.querySelectorAll(`select`);
const address = adForm.querySelector(`#address`);
const mainPin = map.querySelector(`.map__pin--main`);
const adRoomNumber = adForm.querySelector(`#room_number`);
const adRoomCapacity = adForm.querySelector(`#capacity`);
const pinsContainer = map.querySelector(`.map__pins`);
const typeOfHousing = adForm.querySelector(`#type`);
const priceForNight = adForm.querySelector(`#price`);
const timeIn = adForm.querySelector(`#timein`);
const timeOut = adForm.querySelector(`#timeout`);
const mainPinWidth = mainPin.offsetWidth;
const mainPinHeight = mainPin.offsetHeight;
const ApartmentsType = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
const MinPriceForNight = {
  bungalow: `0`,
  flat: `1000`,
  house: `5000`,
  palace: `10000`
};
// генерация рандомных файлов random-data
(() =>{
  const ADVERTISEMENTS_AMOUNT = 8;
  const TITLES = [`Просторная светлая квартира`, `Маленькая грязная квартира`, `Подводный лофт для экстремалов`, `Шикарный зимний дворец`, `Каюта на затонувшем корабле`, `Бунгало в центре города`, `Картонная коробка эконом класса`, `Старый дом с богатой историей для семьи`];
  const PRICES = [20, 10000, 20000, 5000, 70000, 60000, 100, 5, 10000];
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const AMOUNT_ROOMS = [1, 3, 32, 2, 4, 3, 1, 7];
  const AMOUNT_GUESTS = [1, 4, 100, 2, 2, 2, 3, 7];
  const CHECKS = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const DESCRIPTIONS = [`Без детей, животных, амбиций и планов на жизнь`, `Плюсы тараканов в том, что вам не будет одиноко, минусы - аренду они не платят`, `Мокро, холодно, неудобно, но крайне необычно`, `Счета за отопление соизмеримы разве что с вашим эго`, `Красивые фото обеспечены, но говорят, там водятся призраки`, `Стандартное бунгало, соломенная крыша, выход к океану`, `Очень уютная коробка, но немного продувает и менты гоняют`, `Не верьте росказням, что все предыдущие владельцы погибли при мистических обстоятельствах`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // Максимум не включается, минимум включается
  };
  const getAdvertisements = () => {
    const advertisements = [];
    for (let i = 0; i < ADVERTISEMENTS_AMOUNT; i++) {
      let randomRoom = getRandomInt(0, ADVERTISEMENTS_AMOUNT);
      let x = getRandomInt(0, map.offsetWidth);
      let y = getRandomInt(130, 630);
      advertisements[i] = {
        'id': i,
        'author': {
          'avatar': `img/avatars/user0${i + 1}.png`
        },
        'offer': {
          'title': TITLES[randomRoom],
          'address': `${x}, ${y}`,
          'price': PRICES[randomRoom],
          'type': TYPES[getRandomInt(0, TYPES.length)],
          'rooms': AMOUNT_ROOMS[randomRoom],
          'guests': AMOUNT_GUESTS[randomRoom],
          'checkin': CHECKS[getRandomInt(0, CHECKS.length)],
          'checkout': CHECKS[getRandomInt(0, CHECKS.length)],
          'features': FEATURES.slice(0, getRandomInt(0, FEATURES.length)),
          'description': DESCRIPTIONS[randomRoom],
          'photos': PHOTOS.slice(0, getRandomInt(0, PHOTOS.length))
        },
        'location': {
          'x': x,
          'y': y
        }
      };
    }
    return advertisements;
  };
  window.generate = {
    advertisements: getAdvertisements()
  };
})();

// pin
(()=>{
  const getPin = (advertisement) => {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    let newPin = pinTemplate.cloneNode(true);
    const pinImg = newPin.querySelector(`img`);
    const pinWidth = Number(pinImg.getAttribute(`width`));
    const pinHeight = Number(pinImg.getAttribute(`height`));
    newPin.style = `left: ${advertisement.location.x - pinWidth / 2}px; top: ${advertisement.location.y + pinHeight}px`;
    newPin.setAttribute(`data-id`, advertisement.id);
    pinImg.setAttribute(`src`, advertisement.author.avatar);
    pinImg.setAttribute(`alt`, advertisement.offer.title);
    return newPin;
  };
  window.pin = {
    'getPin': getPin
  };
})();
// rendering
(()=>{
  const renderPinsList = (advertisements) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < advertisements.length; i++) {
      let pin = window.pin.getPin(advertisements[i]);
      fragment.appendChild(pin);
    }
    pinsContainer.appendChild(fragment);
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
    const features = Array.from(newCard.querySelectorAll(`.popup__feature`));
    features.forEach((feature, i) => {
      if (!feature.classList.contains(`popup__feature--${advertisement.offer.features[i]}`)) {
        feature.remove();
      }
    });
  };

  const getCard = (advertisement) => {
    const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
    let newCard = cardTemplate.cloneNode(true);
    const cardClose = newCard.querySelector(`.popup__close`);
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
    map.insertBefore(newCard, map.querySelector(`.map__filters-container`));
    cardClose.addEventListener(`click`, onPopupClose);
    document.addEventListener(`keydown`, onPopupClose);
  };

  const renderCard = ()=>{

  };
  window.render = {
    'renderPinsList': renderPinsList,
    'renderCard': renderCard
  };

})();


const onPopupClose = (evt)=>{
  if (evt.key !== `Escape` && evt.button !== 0) {
    return;
  }
  map.querySelector(`.map__card `).remove();
};

const setStateForTags = (tags, state) => {
  tags.forEach((item) => {
    item.disabled = state;
  });
};

const setPassiveMode = () => {
  setStateForTags(adFieldsets, true);
  setStateForTags(filterSelects, true);
  const coords = getCoords(mainPin);
  address.value = `${Math.floor(coords.left + mainPinWidth / 2)}, ${Math.floor(coords.top + mainPinHeight / 2)}`;
};

const setActiveMode = () => {
  setStateForTags(adFieldsets, false);
  setStateForTags(filterSelects, false);
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  window.render.renderPinsList(advertisements);
  address.readOnly = true;
  setNewAddress();
  verifyRoomsCapacity();
  verifyPriceForNight();
  pinsContainer.addEventListener(`click`, onSmallPinActive);
  pinsContainer.addEventListener(`keydown`, onSmallPinActive);
  typeOfHousing.addEventListener(`change`, onChangeTypeOfHousing);
  adRoomNumber.addEventListener(`change`, onChangeRoomCapacity);
  adRoomCapacity.addEventListener(`change`, onChangeRoomCapacity);
  timeIn.addEventListener(`change`, onTimeChange);
  timeOut.addEventListener(`change`, onTimeChange);

};
const onSmallPinActive = (evt)=>{
  if (evt.key !== `Enter` && evt.button !== 0) {
    return;
  }
  if (evt.target.parentNode.type !== `button` && evt.target.type !== `button`) {
    return;
  }
  const mapCard = map.querySelector(`.map__card `);
  if (mapCard) {
    mapCard.remove();
  }
  let indexAdv = evt.target.parentNode.dataset.id;
  if (evt.target.dataset.id) {
    indexAdv = evt.target.dataset.id;
  }
  window.render.renderCard(advertisements[indexAdv]);
};
const onMainPinActive = (evt) => {
  if (evt.button !== 0 && evt.key !== `Enter`) {
    return;
  }
  mainPin.removeEventListener(`click`, onMainPinActive);
  mainPin.removeEventListener(`keydown`, onMainPinActive);
  setActiveMode();
};

const setNewAddress = () => {
  const coords = getCoords(mainPin);
  address.value = `${Math.floor(coords.left + mainPinWidth / 2)}, ${Math.floor(coords.top + mainPinHeight / 2 + MAIN_PIN_ARROW)}`;
};

const getCoords = (elem) => {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};
const onChangeRoomCapacity = ()=>{
  verifyRoomsCapacity();
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
const onChangeTypeOfHousing = ()=>{
  verifyPriceForNight();
};
const verifyPriceForNight = () => {
  priceForNight.setAttribute(`min`, MinPriceForNight[typeOfHousing.value]);
  priceForNight.setAttribute(`placeholder`, MinPriceForNight[typeOfHousing.value]);
};

const onTimeChange = (evt)=>{
  setTimeInOut(evt);
};
const setTimeInOut = (evt)=>{
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};
mainPin.addEventListener(`click`, onMainPinActive);
mainPin.addEventListener(`keydown`, onMainPinActive);

const advertisements = window.generate.advertisements;
setPassiveMode();

