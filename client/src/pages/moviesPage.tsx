import  { useState, useEffect } from 'react';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [likedMovies, setLikedMovies] = useState<string[]>([]); // Liked movie IDs
  const [bookmarkedMovies, setBookmarkedMovies] = useState<string[]>([]); // Bookmarked movie IDs

  useEffect(() => {
    console.log('movies = ', movies);
  }, [movies]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/movies?q=${searchTerm}`); // Fetch movies from API

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      console.log('Movie data:', data);
      setMovies(data.movies || []); // Set movies data from response
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const handleLike = (movieId: string) => {
    setLikedMovies((prevLikedMovies) =>
      prevLikedMovies.includes(movieId)
        ? prevLikedMovies.filter((id) => id !== movieId) // Remove if already liked
        : [...prevLikedMovies, movieId] // Add if not liked
    );
  };

  const handleBookmark = (movieId: string) => {
    setBookmarkedMovies((prevBookmarkedMovies) =>
      prevBookmarkedMovies.includes(movieId)
        ? prevBookmarkedMovies.filter((id) => id !== movieId) // Remove if already bookmarked
        : [...prevBookmarkedMovies, movieId] // Add if not bookmarked
    );
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Search for Movies</h1>
      <div style={{ margin: '0 auto', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Enter movie title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        {movies?.map((movie, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '10px',
              maxWidth: '300px',
              margin: '10px auto',
            }}
          >
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <img
              src={movie.Poster}
              alt={movie.Title}
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <div style={{ marginTop: '10px' }}>
              <button
                onClick={() => handleLike(movie.imdbID)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: likedMovies.includes(movie.imdbID)
                    ? '#28a745'
                    : '#f8f9fa',
                  color: likedMovies.includes(movie.imdbID) ? '#fff' : '#000',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginRight: '5px',
                  cursor: 'pointer',
                }}
              >
                {likedMovies.includes(movie.imdbID) ? 'Unlike' : 'Like'}
              </button>
              <button
                onClick={() => handleBookmark(movie.imdbID)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: bookmarkedMovies.includes(movie.imdbID)
                    ? '#ffc107'
                    : '#f8f9fa',
                  color: bookmarkedMovies.includes(movie.imdbID) ? '#fff' : '#000',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {bookmarkedMovies.includes(movie.imdbID)
                  ? 'Unbookmark'
                  : 'Bookmark'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Liked Movies</h2>
        {likedMovies.map((movieId) => {
          const movie = movies.find((m) => m.imdbID === movieId);
          return movie ? (
            <div
              key={movieId}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px',
                maxWidth: '300px',
                margin: '10px auto',
              }}
            >
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </div>
          ) : null;
        })}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Bookmarked Movies</h2>
        {bookmarkedMovies.map((movieId) => {
          const movie = movies.find((m) => m.imdbID === movieId);
          return movie ? (
            <div
              key={movieId}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px',
                maxWidth: '300px',
                margin: '10px auto',
              }}
            >
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default MoviesPage;
