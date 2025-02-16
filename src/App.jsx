import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import './styles.scss';

function App() {
  return (
    <div className="App h-100">
      <header className="App-header">This is header</header>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Chat />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
