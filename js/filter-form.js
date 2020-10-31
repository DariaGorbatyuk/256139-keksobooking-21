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
  const filters = [
    {
      name: `type`,
      node: housingType,
      selected: false
    },
    {
      name: `price`,
      node: housingPrice,
      selected: false
    },
    {
      name: `rooms`,
      node: housingRooms,
      selected: false
    },
    {
      name: `guests`,
      node: housingGuests,
      selected: false
    },
    {
      name: `features`,
      nodes: [wifi, dishWasher, parking, washer, elevator, conditioner],
      selected: false,
      checked: []
    }
  ];
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
        key.nodes.forEach((feature, i)=>{
          key.checked[i] = feature.checked;
        });
        key.selected = key.checked.includes(true);
      } else {
        key.selected = key.node.value !== `any`;
      }
    });
  };

  const getFeatures = (key)=>{
    return key.nodes.filter((feature, i) => {
      return key.checked[i];
    });
  };
  const filterByFeatures = (filter, advValue, counter)=>{
    let chosenFeatures = getFeatures(filter);
    let features = chosenFeatures.filter((feature)=>{
      return advValue.includes(feature.value);
    });
    if (features.length === chosenFeatures.length) {
      counter++;
    }
    return counter;
  };
  const getNewAdvs = (adverts, selectedFilters) => {
    adverts = adverts.filter((item) => {
      let counter = 0;
      for (let i = 0; i < selectedFilters.length; i++) {
        let filter = selectedFilters[i];
        let advValue = filter.name === `price` ? getPrice(item.offer[filter.name]) : item.offer[filter.name];
        if (filter.name === `features`) {
          counter = filterByFeatures(filter, advValue, counter);
        } else {
          let filterValue = filter.node.value;
          if (filterValue !== String(advValue)) {
            break;
          }
          counter++;
        }
      }
      return counter === selectedFilters.length;
    });
    selectedFilters = [];
    return adverts;
  };
  const onFilterChange = () => {
    checkSelected(filters);
    let selectedFilters = filters.filter((filter) => {
      return filter.selected;
    });
    let adverts = window.download.advertisements;
    if (selectedFilters.length !== 0) {
      adverts = getNewAdvs(adverts, selectedFilters);
    }
    window.form.deletePinsAndCard();
    window.map.renderPinsList(adverts);
    window.filterForm.advertisements = adverts;
  };
  filterForm.addEventListener(`change`, onFilterChange);


  window.filterForm = {
    filterForm,
    filterSelects
  };
})();
