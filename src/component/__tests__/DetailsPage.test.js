import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../redux/reducers"; // Adjust the path to your root reducer
import DetailsPage from "../DetailsPage";

const renderWithProviders = (component, initialState = {}) => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

  return render(
    <MemoryRouter initialEntries={["/movie/123"]} initialIndex={0}>
      <Provider store={store}>{component}</Provider>
    </MemoryRouter>
  );
};

describe("DetailsPage Component", () => {
  beforeEach(() => {
    // Mocking fetch function to prevent actual API calls during testing
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        title: "Test Movie",
        vote_average: 8.5,
        release_date: "2021-06-01",
        runtime: 120,
        director: "John Doe",
        actors: [{ name: "Actor One" }, { name: "Actor Two" }],
        overview: "This is a test movie overview.",
      }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders movie details correctly", async () => {
    renderWithProviders(<DetailsPage />);

    await screen.findByText("Test Movie (8.5)");

    expect(screen.getByText("Test Movie (8.5)")).toBeInTheDocument();
    expect(
      screen.getByText("2021-06-01 | 02:00 | John Doe")
    ).toBeInTheDocument();
    expect(screen.getByText("Cast: Actor One, Actor Two")).toBeInTheDocument();
    expect(
      screen.getByText("Description: This is a test movie overview.")
    ).toBeInTheDocument();
  });
});
