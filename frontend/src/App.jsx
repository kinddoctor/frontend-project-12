import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import Layout from './pages/Layout';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import './styles.scss';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

function ErrorDisplay({ resetError }) {
  const { t } = useTranslation();

  return (
    <div className="h-100 d-flex flex-column justify-content-center">
      <div className="text-center">
        <h1 className="h3">{t('fallbackUI.title')}</h1>
        <p className="mb-1">{t('fallbackUI.text')}</p>
        <button type="button" className="btn btn-secondary" onClick={resetError}>
          {t('fallbackUI.btnText')}
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_WARN} fallbackUI={ErrorDisplay}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Chat />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<LogIn />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
