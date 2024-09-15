import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import ErrorPage from './pages/ErrorPage';
import './styles.scss';

function App() {
  return (
    <div className="App h-100">
      <header className="App-header">
        This is header
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
