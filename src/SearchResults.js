import React from 'react';
import { Link } from 'react-router-dom';

function SearchResults({ movies }) {
  return (
    <div className='search-results'>
      {movies &&
        movies.map((movie) => (
          <div key={movie.imdbID} className='movie-card'>
            <img src={movie.Poster} alt={movie.Title} />
            <div className='movie-details'>
              <h3>{movie.Title}</h3>
              <p>Released: {movie.Year}</p>
              <Link to={`/movies/${movie.imdbID}`}>
                <button>More Details</button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default SearchResults;
