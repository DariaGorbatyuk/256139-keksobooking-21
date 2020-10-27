'use strict';
(() => {
  const filterForm = window.data.map.querySelector(`.map__filters`);
  const filterSelects = filterForm.querySelectorAll(`select`);
  const housingType = filterForm.querySelector(`#housing-type`);
  const pinsContainer = window.map.pinsContainer;

  housingType.addEventListener(`change`, () => {
    let newAdvertisements = window.download.advertisements.filter((item) => {
      return item.offer.type === housingType.value;
    });
    console.log(newAdvertisements);
    newAdvertisements = newAdvertisements.concat(window.download.advertisements);
    newAdvertisements = newAdvertisements.filter((item, i) => {
      return newAdvertisements.indexOf(item) === i;
    });
    window.form.deletePinsAndCard();
    window.map.renderPinsList(newAdvertisements);
    pinsContainer.addEventListener(`click`, window.map.onSmallPinActivated.bind(null, newAdvertisements));
    pinsContainer.addEventListener(`keydown`, window.map.onSmallPinActivated.bind(null, newAdvertisements));
  });

  window.filterForm = {
    filterForm,
    filterSelects
  };
})();

