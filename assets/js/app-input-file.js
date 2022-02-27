'use strict';

app.inputFile = (function () {
  const inputFile = document.querySelector('.input-file');

  function handle (fn) {
    const file = inputFile.files[0];
    const invalidFileType = file.type !== 'text/plain';
    if (invalidFileType) {
      return fn(`invalid File Type: ${file.type}`);
    }
    const fileReader = new FileReader();
    fileReader.onload = function () {
      inputFile.value = '';
      fn(fileReader.result);
    };
    fileReader.readAsText(file);
  }

  function enable (fn) {
    inputFile.addEventListener('change', handle.bind(null, fn));
  }

  return {
    enable
  };
})();