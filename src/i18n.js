import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      signUp: {
        title: 'Войти',
        form: {
          placeholders: {
            username: 'Ваш ник',
            password: 'Пароль',
            re_password: 'Подтвердите пароль',
          },
          submitBtn: 'Войти',
        },
        footer: { text: 'Уже есть аккаунт? ', link: 'Авторизоваться' },
      },
      logIn: {
        title: 'Войти',
        form: {
          placeholders: {
            username: 'Ваш ник',
            password: 'Пароль',
          },
          submitBtn: 'Войти',
        },
        footer: { text: 'Нет аккаунта? ', link: 'Регистрация' },
      },
      chat: {
        navbar: { title: 'Каналы', dropdown: { rename: 'Переименовать', delete: 'Удалить' } },
      },
      channelChat: {
        placeholders: { input: 'Введите сообщение' },
        submitBtn: 'Отправить',
      },
      notFound: {
        title: 'Страница не найдена',
        text: 'Давайте вернемся на ',
        link: 'главную страницу',
      },
      modal: {
        addChannelModal: { title: 'Добавить канал' },
        renameChannelModal: { title: 'Переименовать канал' },
        deleteChannelModal: { title: 'Удалить канал', warning: 'Вы уверены?' },
        sendBtn: 'Отправить',
        closeBtn: 'Закрыть',
        deleteBtn: 'Удалить',
      },
      header: { name: 'Chatty Chat', logoutBtn: 'Выйти' },
      toast: {
        success: {
          addChannel: 'Канал добавлен',
          renameChannel: 'Канал переименован',
          deleteChannel: 'Канал удален',
        },
        error: {
          badNetwork: 'Проблемы с загрузкой данных - попробуйте еще раз позже',
        },
      },
      errors: {
        authorizationError: 'Неверный логин и/или пароль!',
        signupError: 'Такой пользователь уже существует!',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'ru',
  lng: 'ru',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
