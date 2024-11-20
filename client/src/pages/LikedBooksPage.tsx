import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.tsx';

const LikedBooksPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [likedBooks, setLikedBooks] = useState<string[]>([]);

  useEffect(() => {
    const storedLikedBooks = JSON.parse(localStorage.getItem('likedBooks') || '[]');
    setLikedBooks(storedLikedBooks);
  }, []);

  return (
    <div className="container">
      <h1>Liked Books</h1>
      {likedBooks.length === 0 ? (
        <p>No liked books yet.</p>
      ) : (
        <ul>
          {likedBooks.map((bookId, index) => (
            <li key={index}>{bookId}</li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/')} className="button">Go Back</button>
      <button onClick={logout} className="button">Logout</button>
    </div>
  );
};

export default LikedBooksPage;
