import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setSearchTerm } from "../redux/actions/moviesActions";
import HomeIcon from "@material-ui/icons/Home";

const NavigationBar = () => {
  const [searchTermVal, setSearchTermVal] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = useSelector((state) => state.movies.page);
  let location = useLocation();

  const handleSearch = (value) => {
    if (value === "") {
      dispatch(fetchMovies(page));
    } else {
      dispatch(setSearchTerm(value));
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="navigation-bar">
      {location.pathname === "/" && (
        <input
          className="search-input"
          value={searchTermVal}
          onChange={(e) => {
            setSearchTermVal(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search movies..."
        />
      )}

      <HomeIcon
        fontSize="large"
        color="primary"
        onClick={handleHomeClick}
        style={{
          cursor: "pointer",
          marginLeft: "20px",
          position: "absolute",
          right: "5%",
          color: "white",
        }}
      />
    </div>
  );
};

export default NavigationBar;
