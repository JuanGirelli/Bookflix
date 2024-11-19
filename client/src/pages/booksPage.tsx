import React, { useState } from 'react';

const BooksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  interface Book {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
    };
  }

  const [books, setBooks] = useState<Book[]>([]);

  const handleSearch = async () => {
    try {
     // const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);

      const response = await fetch(`/api/books?q=${searchTerm}`);
      const data = await response.json();
      setBooks(data.items || data.list || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div>
      <h1>Search for Books</h1>
      <input
        type="text"
        placeholder="Enter book title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {books.map((book, index) => (
          <div key={index}>
            <h3>{book.title}</h3>
            <p>{book.authors?.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;