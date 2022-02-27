'use strict';

app.kc2json = (() => {
  const config = {
    languages: {
      'de': {
        'bookmark': 'lesezeichen',
        'highlight': 'markierung',
        'note': 'notiz'
      },
      'en': {
        'bookmark': 'bookmark',
        'highlight': 'highlight',
        'note': 'note'
      },
      'es': {
        'bookmark': 'marcador',
        'highlight': 'subrayado',
        'note': 'nota'
      },
      'fr': {
        'bookmark': 'signet',
        'highlight': 'surlignement',
        'note': 'note'
      },
      'it': {
        'bookmark': 'segnalibro',
        'highlight': 'evidenziazione',
        'note': 'nota'
      },
      'pt': {
        'bookmark': 'marcador',
        'highlight': 'destaque',
        'note': 'nota'
      }
    }
  };

  function getClippings (string) {
    return string.split('==========')
      .reduce((accumulator, clipping) => {
        const lines = clipping.split('\n')
          .map(line => line.replace(/\r/g, ''))
          .filter(line => line);
        return [...accumulator, lines];
      }, [])
      .filter(clipping => clipping.length > 1);
  }

  function getLanguage (clippings) {
    return Object.keys(config.languages).filter(language => {
      const highlight = config.languages[language]['highlight'];
      for (const clipping of clippings) {
        const secondLine = clipping[1].toLowerCase();
        const match = secondLine.includes(highlight);
        if (match) {
          return true;
        }
      }
      return false;
    });
  }

  function getTitleAndAuthor (clipping) {
    return clipping[0].split('')
      .filter(char => char.charCodeAt() !== 65279)
      .join('');
  }

  function getText (clipping) {
    return clipping.length < 3 ? null : clipping.slice(2).join('\n');
  }

  function getPage (clipping) {
    const hasPage = clipping[1].split(' | ').length === 3;
    return !hasPage ? null : clipping[1].split(' | ')[0].replace(/\D/g,'');
  }

  function getLocation (clipping) {
    const location = clipping[1].split(' | ').length === 3
      ? clipping[1].split(' | ')[1] : clipping[1].split(' | ')[0];
    const pattern = /\d+\-\d+|\d+/;
    return pattern.test(location) ? location.match(pattern)[0] : null;
  }

  function getDate (clipping) {
    return clipping[1].split(' | ').slice(-1)[0];
  }

  function getType (clipping, languages) {
    const secondLine = clipping[1].toLowerCase();
    for (const language of languages) {
      const types = config.languages[language];
      for (const type of Object.keys(types)) {
        if (secondLine.includes(types[type])) {
          return type;
        }
      }
    }
    return undefined;
  }

  function parseClippings (clippings, languages) {
    const parsedClippings = {};
    for (const clipping of clippings) {
      const titleAndAuthor = getTitleAndAuthor(clipping);
      const page = getPage(clipping);
      const location = getLocation(clipping);
      const date = getDate(clipping);
      const text = getText(clipping);
      const type = getType(clipping, languages);
      if (!parsedClippings[titleAndAuthor]) {
        parsedClippings[titleAndAuthor] = {clippings: []};
      }
      const parsedClipping = type === 'bookmark'
        ? {type, page, location, date} : {type, text, page, location, date};
      parsedClippings[titleAndAuthor].clippings.push(parsedClipping);
    }
    return parsedClippings;
  }

  function main (string) {
    const isValid = string.includes('==========');
    if (!isValid) {
      return {error: true, type: 'Arquivo inválido'};
    }
    const clippings = getClippings(string);
    const languages = getLanguage(clippings);
    if (!languages.length) {
      return {
        error: true, type: 'O idioma do arquivo especificado não é suportado'
      };
    }
    const parsedClippings = parseClippings(clippings, languages);
    return {language: languages, books: {...parsedClippings}};
  }

  return function (myClippings) {
    return main(myClippings);
  }
})();