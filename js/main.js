'use strict';
const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
const ADVERTISEMENTS_AMOUNT = 8;
const TITLES = [`Просторная светлая квартира`, `Маленькая грязная квартира`, `Подводный лофт для экстремалов`, `Шикарный зимний дворец`, `Каюта на затонувшем корабле`, `Бунгало в центре города`, `Картонная коробка эконом класса`, `Старый дом с богатой историей для семьи`];
const PRICES = [20, 10000, 20000, 5000, 70000, 60000, 100, 5, 10000];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const AMOUNT_ROOMS = [1, 3, 32, 1, 4, 2, 1, 7];
const AMOUNT_GUESTS = [2, 4, 100, 2, 2, 2, 3, 7];
const CHECKS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTIONS = [`Без детей, животных, амбиций и планов на жизнь`, `Плюсы тараканов в том, что вам не будет одиноко, минусы - аренду они не платят`, `Мокро, холодно, неудобно, но крайне необычно`, `Счета за отопление соизмеримы разве что с вашим эго`, `Красивые фото обеспечены, но говорят, там водятся призраки`, `Стандартное бунгало, соломенная крыша, выход к океану`, `Очень уютная коробка, но немного продувает и менты гоняют`, `Не верьте росказням, что все предыдущие владельцы погибли при мистических обстоятельствах`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const APARTMENTS_TYPE = {
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

const renderAdvertisements = () => {
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


const renderPin = (advertisement) => {
  let newPin = pinTemplate.cloneNode(true);
  const pinImg = newPin.querySelector(`img`);
  const pinWidth = Number(pinImg.getAttribute(`width`));
  const pinHeight = Number(pinImg.getAttribute(`height`));
  newPin.style = `left: ${advertisement.location.x - pinWidth / 2}px; top: ${advertisement.location.y + pinHeight}px`;
  pinImg.setAttribute(`src`, `${advertisement.author.avatar}`);
  pinImg.setAttribute(`alt`, `${advertisement.offer.title}`);
  return newPin;
};

const renderPinsList = (advertisements) => {
  const pins = map.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < ADVERTISEMENTS_AMOUNT; i++) {
    let pin = renderPin(advertisements[i]);
    fragment.appendChild(pin);
  }
  pins.appendChild(fragment);
};

const fillPhotos = (advertisement, newCard) => { // не обрабатывает пустой массив. как и все остальное в принципе
  const photos = newCard.querySelector(`.popup__photos`);
  const photo = photos.querySelector(`.popup__photo`);
  photo.src = advertisement.offer.photos[0];
  const fragment = document.createDocumentFragment();
  for (let i = 1; i < advertisement.offer.photos.length; i++) {
    let newPhoto = photo.cloneNode();
    newPhoto.src = advertisement.offer.photos[i];
    fragment.appendChild(newPhoto);
  }
  photos.appendChild(fragment);
};

/* const fillFeatures = (advertisement, newCard) => {
  let features = Array.from(newCard.querySelectorAll(`.popup__feature`));
  console.log(`${advertisement.offer.features}`);
  /!* for (let i = 0; i < advertisement.offer.features.length; i++) {
    console.log(`popup__feature--${advertisement.offer.features[i]}`);
    console.log((features[i].classList.contains(`popup__feature--${advertisement.offer.features[i]}`)));
  }*!/
  let difference = features.filter((x) => !advertisement.offer.features.includes(x));
  return features;
};*/

const renderCard = (advertisements) => {
  const advertisement = advertisements[0];
  let newCard = cardTemplate.cloneNode(true);
  newCard.querySelector(`.popup__title`).textContent = advertisement.offer.title;
  newCard.querySelector(`.popup__text--address`).textContent = advertisement.offer.address;
  newCard.querySelector(`.popup__text--price`).textContent = `${advertisement.offer.price}р/ночь`;
  newCard.querySelector(`.popup__type`).textContent = APARTMENTS_TYPE[advertisement.offer.type];
  newCard.querySelector(`.popup__text--capacity`).textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
  newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
  // fillFeatures(advertisement, newCard);
  newCard.querySelector(`.popup__description`).textContent = advertisement.offer.description;
  fillPhotos(advertisement, newCard);
  newCard.querySelector(`.popup__avatar`).src = advertisement.author.avatar;
  map.insertBefore(newCard, map.querySelector(`.map__filters-container`));
  return newCard;
};

map.classList.remove(`map--faded`);
const adv = renderAdvertisements();
console.log(adv[0]);
renderPinsList(renderAdvertisements());
console.log(renderCard(renderAdvertisements()));
// // На основе первого по порядку элемента из сгенерированного массива и шаблона #card создайте DOM-элемент объявления (карточка объявления), заполните его данными из объекта:
// //
// // Выведите заголовок объявления offer.title в заголовок .popup__title.
// // Выведите адрес offer.address в блок .popup__text--address.
// // Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь. Например, 5200₽/ночь.
// // В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalow, Дом для house, Дворец для palace.
// // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.
// // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00.
// // В список .popup__features выведите все доступные удобства в объявлении.
// // В блок .popup__description выведите описание объекта недвижимости offer.description.
// // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
//
// // Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
// // Если данных для заполнения не хватает, соответствующий блок в карточке скрывается.
// // Вставьте полученный DOM-элемент в блок .map перед блоком.map__filters-container
