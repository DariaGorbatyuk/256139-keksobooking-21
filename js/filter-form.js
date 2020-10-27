'use strict';
(() => {
  const filterForm = window.data.map.querySelector(`.map__filters`);
  const filterSelects = filterForm.querySelectorAll(`select`);
  const housingType = filterForm.querySelector(`#housing-type`);

  const findAdv = () => {
    let newAdvertisements = window.download.advertisements.filter((item) => {
      return item.offer.type === housingType.value;
    });
    newAdvertisements = newAdvertisements.concat(window.download.advertisements);
    newAdvertisements = newAdvertisements.filter((item, i) => {
      return newAdvertisements.indexOf(item) === i;
    });
    window.download.advertisements = newAdvertisements;
    return newAdvertisements;
  };

  const onHouseTypeChange = () => {
    let newAdvertisements = findAdv();
    window.form.deletePinsAndCard();
    window.map.renderPinsList(newAdvertisements);
  };

  housingType.addEventListener(`change`, onHouseTypeChange);

  window.filterForm = {
    filterForm,
    filterSelects
  };
})();

