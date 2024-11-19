import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import ChoicePage from './pages/ChoicePage';
import BooksPage from './pages/BooksPage.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'choice',
        element: <ChoicePage />,
      },
      {
        path: 'books',
        element: <BooksPage />,
      },      
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}