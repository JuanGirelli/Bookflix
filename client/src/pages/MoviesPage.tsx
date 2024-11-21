import React, { useEffect, useState } from 'react';
import './MoviesPage.css';
import MovieCard from '../components/MovieCard.tsx';
const MoviesPage: React.FC = () => {
  const [searchVal, setSearchVal] = useState('');
  interface Movies {
    Title: string;
    Year: string;
    Poster: string;
    imdbID: string;
    Plot: string;
  }

  const [movies, getMovies] = useState<Movies[]>([]);

  const [likedMovies, setLikedMovies] = useState<string[]>(JSON.parse(localStorage['likedMovies'] || '[]') || []); // Liked movie IDs
  const [bookmarkedMovies, setBookmarkedMovies] = useState<string[]>([]); // Bookmarked movie IDs

  const searchAPI = async () => {
    try {
      const response = await fetch(`/api/movies?q=${searchVal}`);
      if(!response.ok) {
        alert('Network response was not ok');
      }

      const data = await response.json();
      
      getMovies(data.items || data.movies || []);
    }
     catch (error) {
      console.error('Error fetching movies:', error);
    }
    
  };



  const handleLike = (movieId: string) => {
    setLikedMovies((prevLikedMovies:any) =>
      prevLikedMovies.includes(movieId)
        ? prevLikedMovies.filter((id:any) => id !== movieId) // Remove if already liked
        : [...prevLikedMovies, movieId] // Add if not liked
    );
  };

  const handleBookmark = (movieId: string) => {
    setBookmarkedMovies((prevBookmarkedMovies:any) =>
      prevBookmarkedMovies.includes(movieId)
        ? prevBookmarkedMovies.filter((id:any) => id !== movieId) // Remove if already bookmarked
        : [...prevBookmarkedMovies, movieId] // Add if not bookmarked
    );
  };



  useEffect(() => {

    if (likedMovies.length > 0) {
      localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    }

  }, [likedMovies]);
 

  return (
    <div className = "MoviePage">
        
        <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Enter movie title"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <button onClick={searchAPI}>Search</button>
     
     
     <div className ="movies-container" style={{
        gap: '20px',
      }}>
        {movies.map((m, index) => (
          <div key={index}>
            {/* <MovieList movies={m} /> */}
            <MovieCard
              movie={m}
              likedMovies={likedMovies}
              bookmarkedMovies={bookmarkedMovies}
              handleBookmark={handleBookmark}
              handleLike={handleLike}
              />
          </div>
        ))}
      </div>


      <div style={{ marginTop: '20px' }}>
        <h2>Liked Movies</h2>
        <div className ="movies-container" style={{
          gap: '20px',
        }}>
          {likedMovies.map((movieId, index) => {
            
            const movie = movies.find((m) => m.imdbID === movieId);

            if (!movie) return null;

            return <div key={index}>
              {/* <MovieList movies={m} /> */}
              <MovieCard
                movie={movie}
                likedMovies={likedMovies}
                bookmarkedMovies={bookmarkedMovies}
                handleBookmark={handleBookmark}
                handleLike={handleLike}
                />
            </div>
          } )}
        </div>
      </div>


      <div style={{ marginTop: '20px' }}>
        <h2>Bookmarked Movies</h2>
        <div className ="movies-container" style={{
          gap: '20px',
        }}>
          {bookmarkedMovies.map((movieId, index) => {
            
            const movie = movies.find((m) => m.imdbID === movieId);

            if (!movie) return null;

            return <div key={index}>
              {/* <MovieList movies={m} /> */}
              <MovieCard
                movie={movie}
                likedMovies={likedMovies}
                bookmarkedMovies={bookmarkedMovies}
                handleBookmark={handleBookmark}
                handleLike={handleLike}
                />
            </div>
          } )}
        </div>
      </div>


    </div>
  );
};

export default MoviesPage;