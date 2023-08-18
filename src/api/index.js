import { API_BASE_URL, API_KEY } from "../utils/constants";

/**
 * Fetch the list of upcoming movies.
 */
export const fetchUpcomingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

/**
 * Fetch the details of a specific movie.
 */
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    const creditsResponse = await fetch(
      `${API_BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    );
    let creditsData = await creditsResponse.json();
    let data = await response.json();
    let director = creditsData?.crew.find((obj) => obj.job === "Director");
    data["director"] = director.name;
    data["actors"] = creditsData.cast;
    return data;
  } catch (error) {
    console.error(`Error fetching details for movie ${movieId}:`, error);
    throw error;
  }
};

/**
 * Search for movies.
 */
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=${page}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error searching movies for query ${query}:`, error);
    throw error;
  }
};

// You can add more API functions as needed, for instance to fetch cast, director, etc.
