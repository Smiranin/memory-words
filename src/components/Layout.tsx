import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import LoginWindow from './LoginWindow';
import { useAppSelector } from 'store/hooks';

export default function Layout() {
  const userStatus = useAppSelector((state) => state.userAuth.status);
  return (
    <>
      <TopBar></TopBar>
      <div className="h-[calc(100vh-70px)] overflow-hidden">
        <Outlet />
      </div>
      {userStatus !== 'in' && <LoginWindow />}
    </>
  );
}
