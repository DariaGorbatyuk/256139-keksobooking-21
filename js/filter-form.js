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

  const getPrice = (price)=>{
    if (price <= MIN_PRICE) {
      return `low`;
    } else if (MIN_PRICE < price < MAX_PRICE) {
      return `middle`;
    } else {
      return `high`;
    }
  };


  const getRank = (adv)=>{
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
    /*  if (evt.target.value === `any`) { // спорно
      rank++;
    }*/
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
    /*   adv = adv.filter((item)=>{

      return item.rank > 0;
    });*/


    window.form.deletePinsAndCard();
    window.map.renderPinsList(adv);
    window.filterForm.advertisements = adv;
  };
  filterForm.addEventListener(`change`, onFilterChange);
  /*  housingType.addEventListener(`change`, onFilterChange);
  housingPrice.addEventListener(`change`, onFilterChange);
  housingRooms.addEventListener(`change`, onFilterChange);
  housingGuests.addEventListener(`change`, onFilterChange);*/


  window.filterForm = {
    filterForm,
    filterSelects
  };
})();

/*  const findAdv = () => {
    let newAdvertisements = window.download.advertisements.filter((item) => {
      return item.offer.type === housingType.value;
    });
    window.filterForm.advertisements = newAdvertisements;
    return newAdvertisements;
  };

  const onHouseTypeChange = () => {
    let newAdvertisements = findAdv();
    window.form.deletePinsAndCard();
    window.map.renderPinsList(newAdvertisements);
  };*/
