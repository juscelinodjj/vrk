'use strict';

const app = {
  kc2json: undefined,
  localStorage: undefined,
  alert: undefined,
  header: undefined,
  home: undefined,
  book: undefined,
  sidebar: undefined,
  inputFile: undefined
};

(function () {
  let firstTime = true;

  function main () {
    const myClippings = app.localStorage.load();
    app.sidebar.render(myClippings);
    app.sidebar.enableButtons(myClippings, app.book.render);
    app.sidebar.enableButtons(null, app.header.buttonMenuClickOnSmall);
    app.sidebar.enableButtons(null, app.book.scrollToTop);
    app.home.hide();
    app.book.show();
    app.header.buttons.show();
    if (firstTime) {
      app.header.enableButton('.button-menu', [
        app.book.resizeToFitSidebar,
        app.sidebar.toggle
      ]);
      app.header.enableButton('.button-clear', [
        app.localStorage.clear,
        app.header.buttons.hide,
        app.header.disableButtonMenu,
        app.book.hide,
        app.book.clear,
        app.book.removeResizeToFitSidebar,
        app.sidebar.clear,
        app.sidebar.hide,
        app.home.show
      ]);
      firstTime = false;
    }
    app.header.buttonMenuClick();
  }


  function handleInput (string) {
    const myClippings = app.kc2json(string);
    const {error, type} = myClippings;
    if (error) {
      return app.alert(type);
    }
    app.localStorage.save(myClippings);
    main();
  }

  function init () {
    app.inputFile.enable(handleInput);
    app.localStorage.load() ? main() : app.home.show();
  }

  window.addEventListener('load', () => init());
})();