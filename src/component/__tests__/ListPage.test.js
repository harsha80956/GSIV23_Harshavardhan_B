import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../redux/reducers"; // Adjust the path to your root reducer
import ListPage from "../ListPage";

const renderWithProviders = (component, initialState = {}) => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return render(<Provider store={store}>{component}</Provider>);
};

describe("ListPage Component", () => {
  beforeEach(() => {
    // Mocking fetch function to prevent actual API calls during testing
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        results: [
          {
            id: 1,
            title: "Test Movie",
            vote_average: 8.5,
            overview: "This is a test movie overview.",
            poster_path: "/path_to_image.jpg",
          },
        ],
      }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders movie list correctly", async () => {
    renderWithProviders(<ListPage />);
    const movieTitle = await screen.findByText("Test Movie (8.5)");
    expect(movieTitle).toBeInTheDocument();
  });

  test("pagination works", async () => {
    renderWithProviders(<ListPage />);
    const nextButton = screen.getByText("Next");
    const prevButton = screen.getByText("Previous");

    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
  });
});
