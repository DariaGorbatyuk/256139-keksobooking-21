'use strict';
const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const ADVERTISEMENTS_AMOUNT = 8;
const TITLES = [`Просторная светлая квартира`, `Маленькая грязная квартира`, `Подводный лофт для экстремалов`, `Шикарный зимний дворец`, `Каюта на затонувшем корабле`, `Бунгало в центре города`, `Картонная коробка эконом класса`, `Старый дом с богатой историей для семьи`];
const PRICES = [0, 10000, 20000, 5000, 70000, 60000, 1000000, 5, 10000];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const AMOUNT_ROOMS = [1, 3, 32, 1, 4, 2, 1, 7];
const AMOUNT_GUESTS = [100, 2, 2, 2, 2, 60, 3, 7];
const CHECKS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTIONS = [`Без детей, животных, амбиций и планов на жизнь`, `Плюсы тараканов в том, что вам не будет одиноко, минусы - аренду они не платят`, `Мокро, холодно, неудобно, но крайне необычно`, `Счета за отопление соизмеримы разве что с вашим эго`, `Красивые фото обеспечены, но говорят, там водятся призраки`, `Стандартное бунгало, соломенная крыша, выход к океану`, `Очень уютная коробка, но немного продувает и менты гоняют`, `Не верьте росказням, что все предыдущие владельцы погибли при мистических обстоятельствах`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

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

map.classList.remove(`map--faded`);
renderPinsList(renderAdvertisements());

