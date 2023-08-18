import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailsPage from "./pages/DetailsPage";
import NavigationBar from "./component/NavigationBar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" exact element={<ListPage />} />
          <Route path="/movie/:movieId" element={<DetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
