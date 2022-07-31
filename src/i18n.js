import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import signInEn from './public/locales/en/signIn.json';
import signInRu from './public/locales/ru/signIn.json';

import navbarEn from './public/locales/en/navbar.json';
import navbarRu from './public/locales/ru/navbar.json';

import homePageEn from './public/locales/en/homePage.json';
import homePageRu from './public/locales/ru/homePage.json';

const resources = {
  en: {
    homePage: homePageEn,
    navbar: navbarEn,
    signIn: signInEn,
  },
  ru: {
    homePage: homePageRu,
    navbar: navbarRu,
    signIn: signInRu,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',

    interpolation: { escapeValue: false },
  });

export default i18n;
