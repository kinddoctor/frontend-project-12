import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

export default function Layout() {
  return (
    <div className="h-100">
      <AppHeader />
      <Outlet />
    </div>
  );
}
