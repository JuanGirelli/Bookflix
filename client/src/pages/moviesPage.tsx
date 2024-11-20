import  { useState } from 'react';
import { useAuth } from '../components/AuthContext.tsx';

const MoviesPage = () => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
  }

  const [movies, setMovies] = useState<Movie[]>([]);
  const [likedMovies, setLikedMovies] = useState<string[]>([]); // Liked movie IDs
  const [bookmarkedMovies, setBookmarkedMovies] = useState<string[]>([]); // Bookmarked movie IDs

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/movies?q=${searchTerm}`); // Fetch movies from API
      const data = await response.json();
      setMovies(data.Search || []); // Set movies data from response
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const handleLike = (movieId: string) => {
    setLikedMovies((prevLikedMovies) => [...prevLikedMovies, movieId]); // Add to liked list
  };

  const handleBookmark = (movieId: string) => {
    setBookmarkedMovies((prevBookmarkedMovies) => [...prevBookmarkedMovies, movieId]); // Add to bookmarked list
  };

  return (
    <div>
      <h1>Search for Movies</h1>
      <input
        type="text"
        placeholder="Enter movie title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {movies.map((movie, index) => (
          <div key={index}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
            <div>
              <button onClick={() => handleLike(movie.imdbID)}>Like</button>
              <button onClick={() => handleBookmark(movie.imdbID)}>Bookmark</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2>Liked Movies</h2>
        {likedMovies.map((movieId) => {
          const movie = movies.find((m) => m.imdbID === movieId);
          return movie ? (
            <div key={movieId}>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <img src={movie.Poster} alt={movie.Title} />
            </div>
          ) : null;
        })}
      </div>
      <div>
        <h2>Bookmarked Movies</h2>
        {bookmarkedMovies.map((movieId) => {
          const movie = movies.find((m) => m.imdbID === movieId);
          return movie ? (
            <div key={movieId}>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <img src={movie.Poster} alt={movie.Title} />
            </div>
          ) : null;
        })}
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default MoviesPage;

