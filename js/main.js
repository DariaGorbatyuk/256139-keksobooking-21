'use strict';
const map = document.querySelector(`.map`);
const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const ADVERTISEMENTS_AMOUNT = 8;
const TITLES = [`Просторная светлая квартира`, `Маленькая грязная квартира`, `Подводный лофт для экстремалов`, `Шикарный зимний дворец`, `Каюта на затонувшем корабле`, `Бунгало в центре города`, `Картонная коробка эконом класса`];
const PRICES = [0, 10000, 20000, 5000, 70000, 60000, 1000000, 5];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const AMOUNT_ROOMS = [1, 3, 32, 1, 4, 2, 17];
const AMOUNT_GUESTS = [100, 2, 2, 2, 2, 60, 3];
const CHECKS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTIONS = [`Без детей, животных, амбиций и планов на жизнь`, `Плюсы тараканов в том, что вам не будет одиноко, минусы, аренду они не платят`, `Мокро, холодно, неудобно, но крайне необычно`, `Счета за отопление соизмеримы разве что с вашим эго`, `Красивые фото обеспечены, но говорят, там водятся призраки`, `Стандартное бунгало, соломенная крыша, выход к океану`, `Очень уютная коробка, но немного продувает и менты гоняют`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // Максимум не включается, минимум включается
};

const createArr = (length) => {
  const arr = [];
  for (let i = 1; i <= length; i++) {
    arr.push(i);
  }
  return arr;
};

const shuffleArr = (arr) => { // Перемешивание массива
  let j;
  let swap;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i + 1);
    swap = arr[j];
    arr[j] = arr[i];
    arr[i] = swap;
  }
  return arr;
};

const renderAdvertisements = () => {
  const advertisements = [];
  const numbers = shuffleArr(createArr(ADVERTISEMENTS_AMOUNT));
  for (let i = 0; i < ADVERTISEMENTS_AMOUNT; i++) {
    let randomRoom = getRandomInt(0, TITLES.length);
    let x = getRandomInt(0, map.offsetWidth);
    let y = getRandomInt(130, 630);
    advertisements[i] = {
      'author': {
        'avatar': `img/avatars/user0${numbers[i]}.png`
      },
      'offer': {
        'title': TITLES[randomRoom],
        'address': `${x}, ${y}`,
        'price': PRICES[getRandomInt(0, PRICES.length)],
        'type': TYPES[getRandomInt(0, TYPES.length)],
        'rooms': AMOUNT_ROOMS[getRandomInt(0, AMOUNT_ROOMS.length)],
        'guests': AMOUNT_GUESTS[getRandomInt(0, AMOUNT_GUESTS.length)],
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
  let newPin = pin.cloneNode(true);
  const pinImg = newPin.querySelector(`img`);
  const pinWidth = Number(pinImg.getAttribute(`width`));
  const pinHeight = Number(pinImg.getAttribute(`height`));
  newPin.style = `left: ${advertisement.location.x + pinWidth / 2}px; top: ${advertisement.location.y + pinHeight}px`;
  Object.assign(pinImg, {
    src: advertisement.author.avatar,
    alt: advertisement.offer.title
  });
  return newPin;
};


const advertisements = renderAdvertisements();
console.log(renderPin(advertisements[0]));
map.classList.remove(`map--faded`);
// На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива.
// Итоговую разметку метки .map__pin можно взять из шаблона #pin.
//
// У метки укажите:
//
// Координаты: style="left: {{location.x + смещение по X}}px; top: {{location.y + смещение по Y}}px;"
// Обратите внимание. Координаты X и Y, которые вы вставите в разметку, это не координаты левого верхнего угла блока метки, а координаты, на которые указывает метка своим острым концом. Чтобы найти эту координату нужно учесть размеры элемента с меткой.
//
// У изображения метки укажите:
//
// Аватар: src="{{author.avatar}}"
// Альтернативный текст: alt="{{заголовок объявления}}"
// Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.
