import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Layout from './pages/Layout';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import './styles.scss';

const rollbarConfig = {
  accessToken: import.meta.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Chat />} />
              <Route path="login" element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
