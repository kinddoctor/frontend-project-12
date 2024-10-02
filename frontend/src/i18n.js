import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      errors: {
        Unauthorized: 'Ошибка авторизации - неверный логин и/или пароль',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
