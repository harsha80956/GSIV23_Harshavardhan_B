import {
  fetchMovieDetails as fetchDetails,
  fetchUpcomingMovies,
  searchMovies,
} from "../../api"; // Assuming your API function is named like this

// Action types
export const FETCH_MOVIE_DETAILS_START = "FETCH_MOVIE_DETAILS_START";
export const FETCH_MOVIE_DETAILS_SUCCESS = "FETCH_MOVIE_DETAILS_SUCCESS";
export const FETCH_MOVIE_DETAILS_FAILURE = "FETCH_MOVIE_DETAILS_FAILURE";

export const SET_MOVIES = "SET_MOVIES";
export const SET_ERROR = "SET_ERROR";

export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

// Async action creator
export const fetchMovieDetails = (movieId) => async (dispatch) => {
  dispatch({ type: FETCH_MOVIE_DETAILS_START });

  try {
    const data = await fetchDetails(movieId);
    dispatch({ type: FETCH_MOVIE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_MOVIE_DETAILS_FAILURE, error });
  }
};
export const fetchMovies =
  (page = 1) =>
  async (dispatch) => {
    try {
      const response = await fetchUpcomingMovies(page);
      dispatch({ type: SET_MOVIES, payload: response, page: page });
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      dispatch({ type: SET_ERROR, payload: error });
    }
  };

export const setSearchTerm = (term) => (dispatch) => {
  // Fetch movies based on search term
  searchMovies(term).then((movies) => {
    dispatch({
      type: SET_SEARCH_TERM,
      payload: movies,
    });
  });
};

// Add more actions as needed.
