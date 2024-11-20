import { useState } from 'react';
//mport { FaThumbsUp, FaStar } from 'react-icons/fa';
import type { Book } from '../interfaces/BooksData';

const BooksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [
    likedBooks,
    //setLikedBooks
  ] = useState<string[]>([]);
  const [
    bookmarkedBooks,
    //setBookmarkedBooks
  ] = useState<string[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/books?q=${searchTerm}`);
      const data = await response.json();
      setBooks(data.items || data.list || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // const handleLike = (bookId: string) => {
  //   setLikedBooks((prevLikedBooks) => {
  //     const updatedLikedBooks = [...prevLikedBooks, bookId];
  //     localStorage.setItem('likedBooks', JSON.stringify(updatedLikedBooks));
  //     return updatedLikedBooks;
  //   });
  // };

  // const handleBookmark = (bookId: string) => {
  //   setBookmarkedBooks((prevBookmarkedBooks) => {
  //     const updatedBookmarkedBooks = [...prevBookmarkedBooks, bookId];
  //     localStorage.setItem('bookmarkedBooks', JSON.stringify(updatedBookmarkedBooks));
  //     return updatedBookmarkedBooks;
  //   });
  // };

  return (
    <div className="container">
      <div className="books-page">
        <h1>Search for Books</h1>

        {/* Search Form */}
        <div className="search-form">
          <input
            type="text"
            placeholder="Enter book title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>

        {/* Book List */}
        <div className="books-list">
          {books.map((book, index) => (
            <div key={index} className="book-item">
              <div className="book-details">
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>{book.authors?.join(', ')}</p>
                  {book.hasMovie && <p><strong>Movie Adaptation Available!</strong></p>}
                </div>
                <div className="book-image-container">
                  <img src={book.image} alt={book.title} className="book-image" />
                </div>
              </div>

              {/* <div className="book-actions">
                <button onClick={() => handleLike(book.id)} className="like-button">
                  <FaThumbsUp />
                </button>
                <button onClick={() => handleBookmark(book.id)} className="bookmark-button">
                  <FaStar />
                </button>
              </div> */}

            </div>
          ))}
        </div>

        {/* Display liked and bookmarked books */}
        
        <div className="liked-books">
          <h2>Liked Books</h2>
          <ul>
            {likedBooks.map((bookId, bookIndex) => (
              <li key={bookIndex}>{bookId}</li>
            ))}
          </ul>
        </div>

        <div className="bookmarked-books">
          <h2>Bookmarked Books</h2>
          <ul>
            {bookmarkedBooks.map((bookId, bookIndex) => (
              <li key={bookIndex}>{bookId}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
