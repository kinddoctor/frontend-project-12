import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

export default function Layout() {
  const authorized = useSelector((state) => state.auth.data.token);

  return (
    <div className="h-100">
      <AppHeader authorized={authorized} />
      <Outlet />
    </div>
  );
}
