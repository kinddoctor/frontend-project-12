import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppHeader from '../components/AppHeader';
import selectors from '../store/selectors';

export default function Layout() {
  const authorized = useSelector(selectors.getAuthorizationToken);

  return (
    <div className="h-100 d-flex flex-column">
      <AppHeader authorized={authorized} />
      <Outlet />
      <ToastContainer />
    </div>
  );
}
