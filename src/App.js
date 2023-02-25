
import './App.css';
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// const apiKey = "3d2dc85a";

// const Home = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     const response = await fetch(
//       `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`
//     );
//     const data = await response.json();
//     setSearchResults(data.Search);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Search for a movie..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button type="submit">Search</button>
//       </form>
//       <div className="movie-list">
//         {searchResults.map((movie) => (
//           <div className="movie" key={movie.imdbID}>
//             <h2>{movie.Title}</h2>
//             <img src={movie.Poster} alt={movie.Title} />
//             <p>Released: {movie.Year}</p>
//             <Link to={`/movies/${movie.imdbID}`}>
//               <button>Details</button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const getMovieDetails = async (id) => {
//   const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
//   const data = await response.json();
//   return data;
// };

// const MovieDetails = ({ match }) => {
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     const fetchMovie = async () => {
//       const data = await getMovieDetails(match.params.id);
//       setMovie(data);
//     };
//     fetchMovie();
//   }, [match.params.id]);

//   return (
//     <div>
//       {movie ? (
//         <div>
//           <h1>{movie.Title}</h1>
//           <img src={movie.Poster} alt={movie.Title} />
//           <p>Released: {movie.Released}</p>
//           <p>Plot: {movie.Plot}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Route exact path="/" component={Home} />
//         <Route exact path="/movies/:id" component={MovieDetails} />
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import './App.css';
// import SearchResults from './SearchResults';
// import MovieDetails from './MovieDetails';

// function App() {
//   const [search, setSearch] = useState('');
//   const [movies, setMovies] = useState([]);

//   const handleChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch(
//       `https://www.omdbapi.com/?apikey=${"3d2dc85a"}&s=${search.replace(/\s+/g, '+')}`
//     );
//     const data = await response.json();
//     setMovies(data.Search);
//     setSearch('');
//   };

//   return (
//     <Router>
//       <div className='App'>
//         <nav>
//           <h1>Movie Search</h1>
//           <form onSubmit={handleSubmit}>
//             <input type='text' placeholder='Search Movies...' value={search} onChange={handleChange} />
//             <button type='submit'>Search</button>
//           </form>
//         </nav>
//         <main>
//           <Route exact path='/'>
//             <SearchResults movies={movies} />
//           </Route>
//           <Route path='/movies/:id'>
//             <MovieDetails />
//           </Route>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const apiKey = "3cc4b5c9";

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.Search);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDetails = (imdbID) => {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetails(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Movie Search App</h1>
        </header>
        <Route exact path="/">
          <div className="search-container">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Movies"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="movies-container">
            {movies &&
              movies.map((movie) => (
                <div key={movie.imdbID} className="movie">
                  <img src={movie.Poster} alt={movie.Title} />
                  <div className="movie-details">
                    <h3>{movie.Title}</h3>
                    <p>Year: {movie.Year}</p>
                    <button onClick={() => handleDetails(movie.imdbID)}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </Route>
        <Route path={`/movies/:id`}>
          {movieDetails && (
            <div className="movie-details-container">
              <img src={movieDetails.Poster} alt={movieDetails.Title} />
              <div className="movie-details">
                <h3>{movieDetails.Title}</h3>
                <p>Year: {movieDetails.Year}</p>
                <p>Released: {movieDetails.Released}</p>
                <p>Runtime: {movieDetails.Runtime}</p>
                <p>Genre: {movieDetails.Genre}</p>
                <p>Director: {movieDetails.Director}</p>
                <p>Writer: {movieDetails.Writer}</p>
                <p>Actors: {movieDetails.Actors}</p>
                <p>Plot: {movieDetails.Plot}</p>
              </div>
            </div>
          )}
        </Route>
      </div>
    </Router>
  );
}

export default App;
