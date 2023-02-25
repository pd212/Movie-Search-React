import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}`
      );
      setMovie(response.data);
    };

    fetchData();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details-poster">
        <img src={movie.Poster} alt={movie.Title} />
      </div>
      <div className="movie-details-info">
        <h1>{movie.Title}</h1>
        <p>
          <strong>Released:</strong> {movie.Released}
        </p>
        <p>
          <strong>Runtime:</strong> {movie.Runtime}
        </p>
        <p>
          <strong>Genre:</strong> {movie.Genre}
        </p>
        <p>
          <strong>Director:</strong> {movie.Director}
        </p>
        <p>
          <strong>Writer:</strong> {movie.Writer}
        </p>
        <p>
          <strong>Actors:</strong> {movie.Actors}
        </p>
        <p>
          <strong>Plot:</strong> {movie.Plot}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
