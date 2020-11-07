'use strict';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const FILTER_DELAY = 500;
const filterForm = window.form.filter;
const selects = filterForm.querySelectorAll(`select`);
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
let lastTimeout;
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
    selected: false
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

const checkSelected = (keys) => { // переписать через some
  keys.forEach((key) => {
    if (key.name === `features`) {
      key.selected = key.nodes.some((feature)=>{
        return feature.checked;
      });
    } else {
      key.selected = key.node.value !== `any`;
    }
  });
};

const getCheckedFeatures = (features)=>{
  return features.nodes.filter((feature) => {
    return feature.checked;
  });
};
const filterByFeatures = (features, advValue)=>{
  let chosenFeatures = getCheckedFeatures(features);
  let containedFeatures = chosenFeatures.filter((feature)=>{
    return advValue.includes(feature.value);
  });
  return containedFeatures.length === chosenFeatures.length;
};
const getNewAdverts = (adverts, selectedFilters) => {
  return adverts.filter((item) => {
    for (let i = 0; i < selectedFilters.length; i++) {
      let filter = selectedFilters[i];
      let isMatchFilter;
      let advValue = filter.name === `price` ? getPrice(item.offer[filter.name]) : item.offer[filter.name];
      switch (filter.name) {
        case (`features`):
          isMatchFilter = filterByFeatures(filter, advValue);
          break;
        default:
          isMatchFilter = filter.node.value === advValue.toString();
      }
      if (!isMatchFilter) {
        return false;
      }
    }
    return true;
  });
};
const updateAdverts = ()=>{
  checkSelected(filters);
  let selectedFilters = filters.filter((filter) => {
    return filter.selected;
  });
  let adverts = window.download.advertisements;
  if (selectedFilters.length !== 0) {
    adverts = getNewAdverts(adverts, selectedFilters);
  }
  window.form.deletePinsAndCard();
  window.map.renderPinsList(adverts);
  window.filterForm.advertisements = adverts;
};
const onFilterChange = () => {
  if (lastTimeout) {
    clearTimeout(lastTimeout);
  }
  lastTimeout = setTimeout(updateAdverts, FILTER_DELAY);

};
filterForm.addEventListener(`change`, onFilterChange);


window.filterForm = {
  selects
};
