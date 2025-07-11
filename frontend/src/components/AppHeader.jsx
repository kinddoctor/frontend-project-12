import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setData } from '../store/authSlice';

export default function AppHeader({ authorized }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuitBtnClick = () => {
    localStorage.removeItem('ChattyChat token');
    localStorage.removeItem('ChattyChat username');
    dispatch(setData({ token: '', username: '' }));

    navigate('/login');
  };

  return (
    <header className="h-auto fs-3 py-1 px-2 px-sm-5 border-bottom shadow">
      <nav className="navbar">
        <a className="navbar-brand fs-3 m-0" href="#" onClick={() => navigate('/')}>
          {t('header.link')}
        </a>
        {authorized ? (
          <button onClick={handleQuitBtnClick} type="button" className="btn btn-primary btn-lg">
            {t('header.logoutBtn')}
          </button>
        ) : null}
      </nav>
    </header>
  );
}
