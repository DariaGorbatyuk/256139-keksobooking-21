'use strict';
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const fileChooserAvatar = window.form.add.querySelector(`.ad-form__field input[type=file]`);
const previewAvatar = window.form.add.querySelector(`.ad-form-header__preview img`);
const fileChooserAdverb = window.form.add.querySelector(`.ad-form__upload input[type=file]`);
const previewAdverb = window.form.add.querySelector(`.ad-form__photo`);

const onLoadImg = (input, preview)=>{
  let file = input.files[0];
  let fileType = file.type;
  let matches = FILE_TYPES.some(function (type) {
    return fileType.endsWith(type);
  });
  if (!matches) {
    return;
  }
  let reader = new FileReader();
  reader.addEventListener(`load`, ()=> {
    if (preview.src) {
      preview.src = reader.result;
    } else {
      let img = preview.querySelector(`img`);
      if (img) {
        img.remove();
      }
      preview.style = `display: flex; align-items: center; justify-content: center;`;
      img = document.createElement(`img`);
      img.src = reader.result;
      img.style = `max-width: 100%;`;
      preview.appendChild(img);
    }
  });
  reader.readAsDataURL(file);

};
fileChooserAvatar.addEventListener(`change`, onLoadImg.bind(null, fileChooserAvatar, previewAvatar));
fileChooserAdverb.addEventListener(`change`, onLoadImg.bind(null, fileChooserAdverb, previewAdverb));

window.preview = {
  previewAvatar,
  previewAdverb
};
