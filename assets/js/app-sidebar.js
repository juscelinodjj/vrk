'use strict';

app.sidebar = (function () {
  const sidebar = document.querySelector('.sidebar');
  const sidebarContent = document.querySelector('.sidebar .list');

  function hide () {
    sidebar.classList.add('hide');
  }

  function show () {
    sidebar.classList.remove('hide');
  }

  function toggle () {
    sidebar.classList.toggle('hide');
  }

  function getAuthor (string) {
    const pattern = /(\(.+?\))/g;
    return !pattern.test(string)
      ? ''
      : string.match(pattern)
          .slice(-1).join('').replace('(', '').replace(')', '');
  }

  function getTitle (string) {
    const length = string.lastIndexOf(' (');
    return length === -1 ? null : string.substr(0, length);
  }

  function getMarkup (books) {
    return books.map(book => {
      const author = getAuthor(book);
      const title = author ? getTitle(book) : book;
      return `
        <li class="button">
          <span class="span-title">${title}</span>
          <span class="span-author">${author}</span>
        </li>
      `;
    }).join('');
  }

  function render (myClippings) {
    const books = Object.keys(myClippings.books);
    const markup = getMarkup(books);
    sidebarContent.innerHTML = markup;
  }

  function clear () {
    sidebarContent.innerHTML = '';
  }

  function getBook (button) {
    const title = button.querySelector('.span-title').textContent;
    const author = button.querySelector('.span-author').textContent;
    return author ? `${title} (${author})` : title;
  }

  function enableButtons (myClippings, fn) {
    const buttons = document.querySelectorAll('.sidebar .button');
    for (const button of buttons) {
      if (myClippings) {
        const bookRender = fn;
        button.addEventListener('click', function (event) {
          const book = getBook(event.currentTarget);
          bookRender(myClippings, book);
        });
        continue;
      }
      const buttonMenuClickOnSmall = fn;
      button.addEventListener('click', buttonMenuClickOnSmall);
    }
  }

  return {
    hide, show, toggle, render, clear, enableButtons
  }
})();