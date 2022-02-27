'use strict';

app.alert = (function() {
  const alert = document.querySelector('.alert');
  const content = document.querySelector('.alert .error');

  function show (error) {
    alert.classList.add('active');
    content.textContent = error;
  }

  function hide () {
    alert.classList.remove('active');
    content.textContent = '';
  }

  function main (error) {
    show(error);
    setTimeout(() => hide(), 2500);
  }

  return function (error) {
    return main(error);
  }
})();