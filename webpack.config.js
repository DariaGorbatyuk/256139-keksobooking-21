const path = require("path");

module.exports =  {
entry: [
  "./js/data.js",
  "./js/api.js",
  "./js/download.js",
  "./js/pin.js",
  "./js/card.js",
  "./js/form.js",
  "./js/preview.js",
  "./js/filter-form.js",
  "./js/map.js",
  "./js/mode.js",
  "./js/upload.js"
],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
