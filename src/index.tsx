import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loginRoutes } from './modules/login/routes/loginRoutes';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import type { Router as RemixRouter } from '@remix-run/router';
import { GlobalProvider } from './modules/shared/hooks/useGlobalContext';
import HomeScreen from './modules/home/screens';

const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: < HomeScreen/>,
    errorElement: <div>Erro</div>,
  },
]

const router: RemixRouter = createBrowserRouter([...mainRoutes, ...loginRoutes]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
