'use strict';

app.header = (function() {
  const buttons = document.querySelector('.header .buttons');
  const buttonMenu = document.querySelector('.header .button-menu');

  function hide () {
    buttons.classList.add('hide');
  }

  function show () {
    buttons.classList.remove('hide');
  }

  function buttonMenuClick () {
    buttonMenu.click();
  }

  function buttonMenuClickOnSmall () {
    const isSmall = window.screen.width <= 999;
    if (isSmall) {
      buttonMenuClick();
    }
  }

  function disableButtonMenu () {
    buttonMenu.classList.remove('active');
  }

  function toggleIconButtonMenu () {
    buttonMenu.classList.toggle('active');
  }

  function enableButton (target, fns) {
    const button = document.querySelector(`.header ${target}`);
    if (target === '.button-menu') {
      button.addEventListener('click', toggleIconButtonMenu);
    }
    for (const fn of fns) {
      button.addEventListener('click', fn);
    }
  }

  return {
    buttons: {hide, show},
    enableButton,
    disableButtonMenu,
    buttonMenuClick,
    buttonMenuClickOnSmall
  }
})();