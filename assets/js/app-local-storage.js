'use strict';

app.localStorage = (function() {
  const item = 'myClippings';

  function save (object) {
    const json = JSON.stringify(object);
    localStorage.setItem(item, json);
  }

  function load () {
    const json = localStorage.getItem(item);
    return JSON.parse(json);
  }

  function clear () {
    localStorage.removeItem(item);
  }

  return {
    save, load, clear
  };
})();