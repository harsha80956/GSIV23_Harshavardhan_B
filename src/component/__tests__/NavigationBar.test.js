import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/reducers"; // Adjust the path to your root reducer
import NavigationBar from "../NavigationBar";

const renderWithProviders = (component) => {
  const store = createStore(rootReducer);

  return render(
    <Router>
      <Provider store={store}>{component}</Provider>
    </Router>
  );
};

describe("NavigationBar Component", () => {
  test("renders search input on root path", () => {
    window.history.pushState({}, "", "/");
    renderWithProviders(<NavigationBar />);
    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
  });

  test("changes input value on typing", () => {
    window.history.pushState({}, "", "/");
    renderWithProviders(<NavigationBar />);
    const input = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(input, { target: { value: "Shawshank" } });
    expect(input.value).toBe("Shawshank");
  });

  test("does not render search input on non-root path", () => {
    window.history.pushState({}, "", "/another-route");
    renderWithProviders(<NavigationBar />);
    expect(
      screen.queryByPlaceholderText("Search movies...")
    ).not.toBeInTheDocument();
  });

  test("renders home icon", () => {
    renderWithProviders(<NavigationBar />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
