import React, { useState } from 'react';
import './moviesPage.css';
import MovieCard from '../components/movieCard';
const MoviesPage: React.FC = () => {
  const [searchVal, setSearchVal] = useState('');
  interface Movie {
    Title: string;
    Year: string;
    Poster: string;
    imbID: string;
    Plot: string;
  }

  const [movie, getMovies] = useState<Movie[]>([]);

  const searchAPI = async () => {
    try {
      const response = await fetch(`/api/movies?Search=${searchVal}`);
      if(!response.ok) {
        alert('Network response was not ok');
      }

      const data = await response.json();
      getMovies(data.items || data.movies || []);
      console.log(data.Search);
    }
     catch (error) {
      console.error('Error fetching movies:', error);
    }
    
  };

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
      <div className ="movies-container">
        {movie.map((m, index) => (
          <div key={index}>
            {/* <MovieList movies={m} /> */}
            <MovieCard movies={m} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;