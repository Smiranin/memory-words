import { RouteObject, useRoutes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Game from './pages/game/Game';
import NotFound from './pages/404/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, path: '/dashboard', element: <Dashboard /> },
      { path: '/games/:id', element: <Game /> },
      { path: '*', element: <NotFound /> }
    ]
  }
];

function App() {
  const pages = useRoutes(routes);
  return <>{pages}</>;
}

export default App;
