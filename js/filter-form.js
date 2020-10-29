'use strict';
(() => {
  const MIN_PRICE = 10000;
  const MAX_PRICE = 50000;
  const filterForm = window.data.map.querySelector(`.map__filters`);
  const filterSelects = filterForm.querySelectorAll(`select`);
  const housingType = filterForm.querySelector(`#housing-type`);
  const housingPrice = filterForm.querySelector(`#housing-price`);
  const housingRooms = filterForm.querySelector(`#housing-rooms`);
  const housingGuests = filterForm.querySelector(`#housing-guests`);
  const housingFeatures = filterForm.querySelector(`#housing-features`);

  const getPrice = (price) => {
    if (price <= MIN_PRICE) {
      return `low`;
    } else if (MIN_PRICE < price && price < MAX_PRICE) {
      return `middle`;
    } else {
      return `high`;
    }
  };
  const checkSelected = (keys) => {
    keys.forEach((key) => {
      key.selected = key.filter.value !== `any`;
    });
  };
  const keys = [
    {
      name: `housingType`,
      filter: housingType,
      selected: false,
      path: `type`
    },
    {
      name: `housingPrice`,
      filter: housingPrice,
      selected: false,
      path: `price`
    },
    {
      name: `housingRooms`,
      filter: housingRooms,
      selected: false,
      path: `rooms`
    },
    {
      name: `housingGuests`,
      filter: housingGuests,
      selected: false,
      path: `guests`
    }
  ];
  const getNewAdvs = (advs, selectedFilters) => {
    advs = advs.filter((item) => {
      let counter = 0;
      for (let i = 0; i < selectedFilters.length; i++) {
        let key = selectedFilters[i];
        let advValue = item.offer[key.path];
        if (key.name === `housingPrice`) {
          advValue = getPrice(item.offer[key.path]);
        }
        let filterValue = key.filter.value;
        if (filterValue !== String(advValue)) {
          break;
        }
        counter++;
      }
      return counter === selectedFilters.length;
    });
    selectedFilters = [];
    return advs;
  };
  const onFilterChange = () => {
    checkSelected(keys);
    let selectedFilters = keys.filter((i) => i.selected);
    let advs = window.download.advertisements;
    if (selectedFilters.length !== 0) {
      advs = getNewAdvs(advs, selectedFilters);
    }
    window.form.deletePinsAndCard();
    window.map.renderPinsList(advs);
    window.filterForm.advertisements = advs;
  };
  filterForm.addEventListener(`change`, onFilterChange);


  window.filterForm = {
    filterForm,
    filterSelects
  };
})();
