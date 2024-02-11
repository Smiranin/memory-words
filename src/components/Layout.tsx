import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import LoginWindow from './LoginWindow';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useEffect } from 'react';
import { userInit } from 'store/authSlice';

export default function Layout() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.userAuth);
  useEffect(() => {
    dispatch(userInit());
  }, []);

  return (
    <>
      <TopBar user={auth.user}></TopBar>
      <div className="h-[calc(100vh-70px)] overflow-hidden">
        <Outlet />
      </div>
      {auth.status === 'out' && <LoginWindow />}
    </>
  );
}
