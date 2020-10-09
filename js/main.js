'use strict';
const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
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

const ApartmentsType = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

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


const getPin = (advertisement) => {
  let newPin = pinTemplate.cloneNode(true);
  const pinImg = newPin.querySelector(`img`);
  const pinWidth = Number(pinImg.getAttribute(`width`));
  const pinHeight = Number(pinImg.getAttribute(`height`));
  newPin.style = `left: ${advertisement.location.x - pinWidth / 2}px; top: ${advertisement.location.y + pinHeight}px`;
  pinImg.setAttribute(`src`, advertisement.author.avatar);
  pinImg.setAttribute(`alt`, advertisement.offer.title);
  return newPin;
};

const renderPinsList = (advertisements) => {
  const pins = map.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < ADVERTISEMENTS_AMOUNT; i++) {
    let pin = getPin(advertisements[i]);
    fragment.appendChild(pin);
  }
  pins.appendChild(fragment);
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

const renderCard = (advertisement) => {
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
  map.insertBefore(newCard, map.querySelector(`.map__filters-container`));
};

const advertisements = getAdvertisements();
// renderCard(advertisements[0]);
const adForm = document.querySelector(`.ad-form`);
const filterForm = map.querySelector(`.map__filters`);
const adFieldsets = adForm.querySelectorAll(`fieldset`);
const filterSelects = filterForm.querySelectorAll(`select`);
const address = adForm.querySelector(`#address`);
const mainPin = map.querySelector(`.map__pin--main`);
const mainPinWidth = mainPin.offsetWidth;
const mainPinHeight = mainPin.offsetHeight;
const mainPinArrow = 22;
const adSubmit = adForm.querySelector(`.ad-form__submit`);
const adRoomNumber = adForm.querySelector(`#room_number`);
const adRoomCapacity = adForm.querySelector(`#capacity`);


const disabledTags = (tags)=>{
  tags.forEach((item)=>{
    item.disabled = true;
  });
};
const enabledTags = (tags)=>{
  tags.forEach((item)=>{
    item.disabled = false;
  });
};

const setPassiveMode = ()=>{
  disabledTags(adFieldsets);
  disabledTags(filterSelects);
  const coords = getCoords(mainPin);
  address.value = `${Math.floor(coords.left + mainPinWidth / 2)}, ${Math.floor(coords.top + mainPinHeight / 2)}`;
};

const setActiveMode = ()=>{
  enabledTags(adFieldsets);
  enabledTags(filterSelects);
  map.classList.remove(`map--faded`);
  renderPinsList(advertisements);
  address.readOnly = true;
  verifyRoomsCapacity();
};

mainPin.addEventListener(`click`, function (evt) {
  if (evt.button === 0) {
    setActiveMode();
    setNewAddress();
  }
});
// не удаляю обработчики
mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    setActiveMode();
    setNewAddress();
  }
});

const setNewAddress = ()=>{
  const coords = getCoords(mainPin);
  address.value = `${Math.floor(coords.left + mainPinWidth / 2)}, ${Math.floor(coords.top + mainPinHeight / 2 + mainPinArrow)}`;
};

const getCoords = (elem)=>{
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

const verifyRoomsCapacity = function () {
  console.log(adRoomNumber.value);
  switch (adRoomNumber.value) {
    case `1`:
      if (adRoomCapacity.value === `1`) {
        adRoomCapacity.setCustomValidity(``);
      } else {
        adRoomCapacity.setCustomValidity(`1 комната — для 1 гостя`);
      }
      break;
    case `2`:
      if (adRoomCapacity.value === `1` || adRoomCapacity.value === `2`) {
        adRoomCapacity.setCustomValidity(``);
      } else {
        adRoomCapacity.setCustomValidity(`2 комнаты — для 2 гостей или для 1 гостя`);
      }
      break;
    case `3`:
      if (adRoomCapacity.value === `1` || adRoomCapacity.value === `2` || adRoomCapacity.value === `3`) {
        adRoomCapacity.setCustomValidity(``);
      } else {
        adRoomCapacity.setCustomValidity(`3 комнаты — для 3 гостей, для 2 гостей или для 1 гостя`);
      }
      break;
    case `100`:
      if (adRoomCapacity.value === `не для гостей`) {
        adRoomCapacity.setCustomValidity(``);
      } else {
        adRoomCapacity.setCustomValidity(`100 комнат — не для гостей`);
      }
  }
};

// setPassiveMode();
setActiveMode();
// change!!!
adRoomNumber.addEventListener(`change`, function () {
  verifyRoomsCapacity();
});

adRoomCapacity.addEventListener(`change`, function () {
  verifyRoomsCapacity();
});
/*
adForm.addEventListener(`submit`, function (evt) {
  evt.preventDefault();
  verifyRoomsCapacity();
});
*/


