'use strict';

app.home = (function () {
  const home = document.querySelector('.home');
  const uploadArea = document.querySelector('.upload-area');
  uploadArea.addEventListener('click', openFileBrowser);

  function hide () {
    home.classList.add('hide');
  }

  function show () {
    home.classList.remove('hide');
  }

  function openFileBrowser () {
    const inputFile = document.querySelector('.input-file');
    inputFile.click();
  }

  return {
    hide, show
  }
})();