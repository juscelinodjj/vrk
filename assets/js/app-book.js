'use strict';

app.book = (function () {
  const book = document.querySelector('.book');
  const infoTitle = document.querySelector('.book .info .title');
  const infoAuthor = document.querySelector('.book .info .author');
  const bookClippings = document.querySelector('.book .clippings');

  function hide () {
    book.classList.add('hide');
  }

  function show () {
    book.classList.remove('hide');
  }

  function scrollToTop () {
    bookClippings.scrollTop = 0;
  }

  function resizeToFitSidebar () {
    book.classList.toggle('sidebar-actived');
  }

  function removeResizeToFitSidebar () {
    book.classList.remove('sidebar-actived');
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

  function getTypeInPortuguese (key) {
    return {
      'bookmark': 'marcador', 'highlight': 'destaque', 'note': 'nota'
    }[key];
  }

  function getMarkup (clippings) {
    return clippings.map(clipping => {
      const text = clipping.text || '';
      const type = getTypeInPortuguese(clipping.type);
      const page = clipping.page || 'N/D';
      const location = clipping.location;
      const date = clipping.date;
      const markupText = clipping.type === 'bookmark'
        ? '' : `<span class="text">${text}</span>`;
      return `
        <section class="clipping">
          ${markupText}
          <div class="left">
            <span class="type">${type}</span>
            <span class="page">página ${page}</span>
            <span class="location">posição ${location}</span>
          </div>
          <div class="right">
            <span class="span-date">${date}</span>
          </div>
        </section>
      `;
    }).join('');
  }

  function render (myClippings, book) {
    const author = getAuthor(book);
    const title = author ? getTitle(book) : book;
    const {clippings} = myClippings.books[book];
    const markup = getMarkup(clippings);
    infoTitle.textContent = title;
    infoAuthor.textContent = author;
    bookClippings.innerHTML = markup;
  }

  function clear () {
    infoTitle.textContent = '';
    infoAuthor.textContent = '';
    bookClippings.innerHTML = '';
  }

  return {
    hide, show, scrollToTop,
    resizeToFitSidebar, removeResizeToFitSidebar, render, clear
  }
})();