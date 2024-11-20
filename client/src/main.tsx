import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import ChoicePage from './pages/ChoicePage';
import BooksPage from './pages/BooksPage.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import { AuthProvider } from './components/AuthContext'; 
import LogoutPage from './pages/LogoutPage.tsx';
import LikedBooksPage from './pages/LikedBooksPage.tsx'; 
import BookmarkedBooksPage from './pages/BookmarkedBooksPage.tsx';

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
        path: 'choice',
        element: <ChoicePage />,
      },
      {
        path: 'books',
        element: <BooksPage />,
      },
      {
        path: 'liked-books',
        element: <LikedBooksPage />,
      },
      {
        path: 'bookmarked-books',
        element: <BookmarkedBooksPage />,
      },
             
      {
        path: 'logout',
        element: <LogoutPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
