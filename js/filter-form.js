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
  const wifi = filterForm.querySelector(`#filter-wifi`);
  const dishWasher = filterForm.querySelector(`#filter-dishwasher`);
  const parking = filterForm.querySelector(`#filter-parking`);
  const washer = filterForm.querySelector(`#filter-washer`);
  const elevator = filterForm.querySelector(`#filter-elevator`);
  const conditioner = filterForm.querySelector(`#filter-conditioner`);
  // const housingFeatures = filterForm.querySelector(`#housing-features`);

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
      if (key.name === `features`) {
        key.filter.forEach((feature, i)=>{
          key.checked[i] = feature.checked;
          key.selected = key.checked.includes(true);
        });
      } else {
        key.selected = key.filter.value !== `any`;
      }
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
    },
    {
      name: `features`,
      filter: [wifi, dishWasher, parking, washer, elevator, conditioner],
      selected: false,
      checked: [false, false, false, false, false, false],
      path: `features`
    }
  ];
  const getFeatures = (key)=>{
    return key.filter.filter((feature, i) => {
      return key.checked[i];
    });
  };
  const getNewAdvs = (advs, selectedFilters) => {
    advs = advs.filter((item) => {
      let counter = 0;
      for (let i = 0; i < selectedFilters.length; i++) {
        let key = selectedFilters[i];
        let advValue = item.offer[key.path];
        if (key.name === `housingPrice`) {
          advValue = getPrice(item.offer[key.path]);
        }
        if (key.name === `features`) {
          let chosenFeatures = getFeatures(key);
          let features = chosenFeatures.filter((feature)=>{
            return advValue.includes(feature.value);
          });
          if (features.length === chosenFeatures.length) {
            counter++;
          }
        } else {
          let filterValue = key.filter.value;
          if (filterValue !== String(advValue)) {
            break;
          }
          counter++;
        }
      }
      return counter === selectedFilters.length;
    });
    selectedFilters = [];
    return advs;
  };
  const onFilterChange = () => {
    debugger;
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
