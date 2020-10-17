'use strict';
(()=>{
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
    'getCard': getCard
  };
})();
