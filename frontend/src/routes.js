import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import User from './pages/User';
import NotFound from './pages/Page404';
import {useAuth} from './auth/Auth'
import  {useContext}  from 'react';
// ----------------------------------------------------------------------

export default function Router() {
  const signed  = useContext(useAuth);

  return useRoutes([
    !signed ? { path: '/', element: <Navigate to="/login" /> } : { path: '/', element: <Navigate to="/eventos" /> },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/eventos" replace /> },
        { path: 'painel-anfitriao', element: <DashboardApp /> },
        { path: 'painel-convidado', element: <User /> },
        { path: 'eventos', element: <Products /> },
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'registro', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
