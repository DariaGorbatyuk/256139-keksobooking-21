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
    } else if (MIN_PRICE < price < MAX_PRICE) {
      return `middle`;
    } else {
      return `high`;
    }
  };
  const isSelected = (items) => {
    items.forEach((item, i) => {
      keys[i].selected = item.value !== `any`;
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

  const onFilterChange = () => {
    debugger;
    const selectors = [housingType, housingPrice, housingRooms, housingGuests];
    isSelected(selectors);

    let keysSelectedFilter = keys.filter((i) => i.selected);
    let adv = window.download.advertisements;
    if (keysSelectedFilter.length !== 0) {
      adv = adv.filter((item) => {
        let res = [];
        keysSelectedFilter.forEach((key) => {
          let advValue = item.offer[key.path];
          if (key.name === housingPrice) {
            advValue = getPrice(item.offer[key.path]);
          }
          let filterValue = key.filter.value;
          if (filterValue === String(advValue)) {
            res.push(true);
          } else {
            res.push(false);
          }
        });
        return res.indexOf(false) === -1;
      });
    }
    keysSelectedFilter = [];
    window.form.deletePinsAndCard();
    window.map.renderPinsList(adv);
    window.filterForm.advertisements = adv;
  };
  filterForm.addEventListener(`change`, onFilterChange);


  window.filterForm = {
    filterForm,
    filterSelects
  };
})();
/*
  */
/*  const getRank = (adv)=>{
    let rank = 0;
    let maxRank = 0;
    if (adv.offer.type === housingType.value) {
      rank++;
    }
    if (getPrice(adv.offer.price) === housingPrice.value) {
      rank++;
    }
    if (String(adv.offer.rooms) === housingRooms.value) {
      rank++;
    }
    if (String(adv.offer.guests) === housingGuests.value) {
      rank++;
    }
    /!*  if (evt.target.value === `any`) { // спорно
      rank++;
    }*!/
    if (rank > maxRank) {
      maxRank = rank;
    }
    adv.rank = rank;
    return maxRank;
  };
  const onFilterChange = ()=>{

    let adv = window.download.advertisements;
    let maxRank;
    debugger;
    adv.forEach((item)=>{
      getRank(item);
    });
    adv.sort((left, right)=>{
      return right.rank - left.rank;
    });
    maxRank = adv[0].rank;
    adv = adv.filter((item)=>{
      return item.rank === maxRank;
    });
    window.form.deletePinsAndCard();
    window.map.renderPinsList(adv);
    window.filterForm.advertisements = adv;
  };*/
