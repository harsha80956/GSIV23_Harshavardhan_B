// MovieCard.js
import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      className="movie-card"
      style={{ textDecoration: "none" }}
      to={`/movie/${movie.id}`}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h3 className="movie-title">
        {movie.title} ({movie.vote_average})
      </h3>
      <div className="movie-overview">{movie.overview}</div>
    </Link>
  );
};

export default MovieCard;
