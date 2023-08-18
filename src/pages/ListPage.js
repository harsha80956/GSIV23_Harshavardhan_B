import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/actions/moviesActions";
import MovieCard from "../component/MovieCard";

const ListPage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(24); // Example value, adjust as needed

  useEffect(() => {
    dispatch(fetchMovies(currentPage));
  }, [currentPage, dispatch]);

  const handlePageClick = (action) => {
    if (action === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (action === "next" && currentPage < totalPages) {
      // Assuming totalPages is defined. If not, you might have logic to determine if there's a next page.
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (typeof action === "number") {
      setCurrentPage(action);
    }
  };

  return (
    <div>
      <div className="movie-list">
        {movies &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageClick("prev")}>Previous</button>

        {currentPage > 3 && (
          <button onClick={() => handlePageClick(1)}>1</button>
        )}
        {currentPage > 4 && <button>...</button>}

        {Array(5)
          .fill()
          .map((_, idx) => {
            const pageNumber = currentPage + idx - 2;
            if (pageNumber < totalPages && pageNumber > 0) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber)}
                  className={pageNumber === currentPage ? "active" : ""}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}

        {currentPage < totalPages - 3 && <button>...</button>}
        {currentPage < totalPages - 2 && (
          <button onClick={() => handlePageClick(totalPages)}>
            {totalPages}
          </button>
        )}

        <button onClick={() => handlePageClick("next")}>Next</button>
      </div>
    </div>
  );
};

export default ListPage;
