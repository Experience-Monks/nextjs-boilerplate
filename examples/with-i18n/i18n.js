/*
  Do not copy/paste this file. It is used internally
  to manage end-to-end test suites.
*/

const NextI18Next = require('next-i18next').default;
const localeSubpaths = typeof process.env.LOCALE_SUBPATHS === 'string' ? process.env.LOCALE_SUBPATHS : 'none';

const localeSubpathVariations = {
  none: {},
  foreign: {
    fr: 'fr'
  },
  all: {
    en: 'en',
    fr: 'fr'
  }
};

module.exports = new NextI18Next({
  otherLanguages: ['fr'],
  localeSubpaths: localeSubpathVariations[localeSubpaths]
});
