import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';

export default function Layout() {
  return (
    <div>
      <TopBar></TopBar>
      <div className="h-[calc(100vh-70px)] overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
