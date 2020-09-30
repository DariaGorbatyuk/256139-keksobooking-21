'use strict';
const map = document.querySelector(`.map`);
const ADVERTISEMENTS_AMOUNT = 8;
const TITLES = [`Просторная светлая квартира`, `Маленькая грязная квартира`, `Подводный лофт для экстремалов`, `Шикарный зимний дворец`, `Шикарный летний дворец`, `Бунгало в центре города`, `Картонная коробка эконом класса`];
const PRICES = [0, 10000, 20000, 5000, 70000, 60000, 1000000, 5];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const AMOUNT_ROOMS = [1, 3, 32, 1, 4, 2, 2, 17];
const AMOUNT_GUESTS = [100, 2, 2, 2, 2, 60, 3, 3];
const CHECKS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
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

const createAdvertisements = () => {
  const advertisements = [];
  const numbers = shuffleArr(createArr(ADVERTISEMENTS_AMOUNT));
  for (let i = 0; i < ADVERTISEMENTS_AMOUNT; i++) {
    advertisements[i] = {
      'author': {
        'avatar': `img/avatars/user0${numbers[i]}.png`
      },
      'offer': {
        'title': TITLES[getRandomInt(0, TITLES.length)],
        'address': `xz`, // change
        'price': PRICES[getRandomInt(0, PRICES.length)],
        'type': TYPES[getRandomInt(0, TYPES.length)],
        'rooms': AMOUNT_ROOMS[getRandomInt(0, AMOUNT_ROOMS.length)],
        'guests': AMOUNT_GUESTS[getRandomInt(0, AMOUNT_GUESTS.length)],
        'checkin': CHECKS[getRandomInt(0, CHECKS.length)],
        'checkout': CHECKS[getRandomInt(0, CHECKS.length)],
        'features': FEATURES.slice()
      }
    };
  }
  return advertisements;
};

map.classList.remove(`map--faded`);
// Напишите функцию для создания массива из 8 сгенерированных JS объектов. Каждый объект массива ‐ описание похожего объявления неподалёку.
// Структура объектов должна быть следующей:
// {
//     "author": {
//         "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
//     },
//     "offer": {
//         "title": строка, заголовок предложения
//         "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
//         "price": число, стоимость
//         "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow
//         "rooms": число, количество комнат
//         "guests": число, количество гостей, которое можно разместить
//         "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
//         "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
//         "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
//         "description": строка с описанием,
//         "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
//     },
//     "location": {
//         "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
//         "y": случайное число, координата y метки на карте от 130 до 630.
//     }
// }
