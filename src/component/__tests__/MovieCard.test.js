import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MovieCard from "../MovieCard";

const mockMovie = {
  id: 1,
  title: "The Shawshank Redemption",
  vote_average: 9.3,
  poster_path: "/somepath.jpg",
  overview:
    "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
};

describe("MovieCard Component", () => {
  test("renders movie title and rating correctly", () => {
    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    expect(
      screen.getByText("The Shawshank Redemption (9.3)")
    ).toBeInTheDocument();
  });

  test("renders movie image correctly", () => {
    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    const image = screen.getByRole("img", {
      name: /the shawshank redemption/i,
    });
    expect(image).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/somepath.jpg"
    );
  });

  test("renders movie overview correctly", () => {
    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    expect(
      screen.getByText(/two imprisoned men bond over a number of years/i)
    ).toBeInTheDocument();
  });
});
