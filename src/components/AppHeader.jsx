import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setData } from '../redux/store/authSlice';

export default function AppHeader({ authorized }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuitBtnClick = () => {
    localStorage.removeItem('ChattyChat token');
    localStorage.removeItem('ChattyChat username');
    dispatch(setData({ token: '', username: '' }));

    navigate('/login');
  };

  return (
    <header className="h-auto fs-3 p-2 px-sm-5 py-sm-3 border-bottom shadow">
      <nav className="navbar">
        <span>Chatty chat</span>
        {authorized ? (
          <button onClick={handleQuitBtnClick} type="button" className="btn btn-primary btn-lg">
            Выйти
          </button>
        ) : null}
      </nav>
    </header>
  );
}
