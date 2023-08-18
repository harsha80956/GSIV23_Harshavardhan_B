import {
  FETCH_MOVIE_DETAILS_START,
  FETCH_MOVIE_DETAILS_SUCCESS,
  FETCH_MOVIE_DETAILS_FAILURE,
  SET_MOVIES,
  SET_SEARCH_TERM,
  SET_ERROR,
} from "../actions/moviesActions";
const initialState = {
  movies: [],
  searchTerm: "",
  error: null,
  movieDetails: null,
  loading: false,
  page: 1,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return { ...state, movies: action.payload, page: action.page };
    case SET_SEARCH_TERM:
      return { ...state, movies: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MOVIE_DETAILS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        movieDetails: action.payload,
      };

    case FETCH_MOVIE_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        movieDetails: null,
      };
    default:
      return state;
  }
};

export default moviesReducer;
