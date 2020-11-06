'use strict';
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const fileChooserAvatar = window.form.adForm.querySelector(`.ad-form__field input[type=file]`);
const previewAvatar = window.form.adForm.querySelector(`.ad-form-header__preview img`);
const fileChooserAdverbImg = window.form.adForm.querySelector(`.ad-form__upload input[type=file]`);
const previewAdverb = window.form.adForm.querySelector(`.ad-form__photo`);

fileChooserAvatar.addEventListener(`change`, ()=>{
  let file = fileChooserAvatar.files[0];
  let fileType = file.type;
  let matches = FILE_TYPES.some(function (type) {
    return fileType.endsWith(type);
  });
  if (matches) {
    let reader = new FileReader();
    reader.addEventListener(`load`, ()=> {
      previewAvatar.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});
