import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const BookmarkedBooksPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [bookmarkedBooks, setBookmarkedBooks] = useState<string[]>([]);

  useEffect(() => {
    const storedBookmarkedBooks = JSON.parse(localStorage.getItem('bookmarkedBooks') || '[]');
    setBookmarkedBooks(storedBookmarkedBooks);
  }, []);

  return (
    <div className="container">
      <h1>Bookmarked Books</h1>
      {bookmarkedBooks.length === 0 ? (
        <p>No bookmarked books yet.</p>
      ) : (
        <ul>
          {bookmarkedBooks.map((bookId, index) => (
            <li key={index}>{bookId}</li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/')} className="button">Go Back</button>
      <button onClick={logout} className="button">Logout</button>
    </div>
  );
};

export default BookmarkedBooksPage;
