import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../redux/actions/moviesActions";

const DetailsPage = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movieDetails);

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
  }, [dispatch, movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details-container">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-image"
      />

      <div>
        <h2>
          {movie.title} ({movie.vote_average})
        </h2>
        <p>
          {movie.release_date} |{" "}
          {new Date(movie.runtime * 60 * 1000).toISOString().substr(11, 5)} |{" "}
          {movie.director}
        </p>
        <strong>Cast:</strong>{" "}
        {movie.actors.map((actor) => actor.name).join(", ")}
        <p>
          {" "}
          <strong>Description: </strong> {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default DetailsPage;
