import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      signUp: {
        title: 'Регистрация',
        form: {
          placeholders: {
            username: 'Имя пользователя',
            password: 'Пароль',
            re_password: 'Подтвердите пароль',
          },
          submitBtn: 'Зарегистрироваться',
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
      header: { link: 'Hexlet Chat', logoutBtn: 'Выйти' },
      toast: {
        success: {
          addChannel: 'Канал создан',
          renameChannel: 'Канал переименован',
          deleteChannel: 'Канал удалён',
        },
        error: {
          badNetwork: 'Ошибка соединения',
        },
      },
      fallbackUI: {
        title: 'Кажется, что-то пошло не так.',
        text: 'Давайте попробуем',
        btnText: 'перезагрузиться',
      },
      errors: {
        authorizationError: 'Неверные имя пользователя или пароль',
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
