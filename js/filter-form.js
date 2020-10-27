'use strict';
(() => {
  const filterForm = window.data.map.querySelector(`.map__filters`);
  const filterSelects = filterForm.querySelectorAll(`select`);


  window.filterForm = {
    filterForm,
    filterSelects
  };
})();

