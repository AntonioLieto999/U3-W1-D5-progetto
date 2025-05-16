import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = "545085ab";
const SEARCH_TERMS = ["avengers", "harry potter"];

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      SEARCH_TERMS.map((term) =>
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${term}`)
          .then((res) => res.json())
          .then((data) => data.Search || [])
      )
    )
      .then((results) => {
        const allMovies = [].concat(...results);
        const uniqueMovies = Array.from(new Map(allMovies.map((m) => [m.imdbID, m])).values());
        setMovies(uniqueMovies);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container-fluid px-4">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <h2 className="mb-4">TV Shows</h2>
          <div className="btn-group" role="group">
            <div className="dropdown ms-4 mt-1">
              <button
                type="button"
                className="btn btn-secondary btn-sm dropdown-toggle rounded-0"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ backgroundColor: "#221f1f" }}
              >
                Genres
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Comedy
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Drama
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Thriller
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <i className="bi bi-grid icons"></i>
          <i className="bi bi-grid-3x3 icons"></i>
        </div>
      </div>
      <h4>Trending Now</h4>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 mb-4 g-3">
        {loading ? (
          <div>Load</div>
        ) : (
          movies.map((movie) => (
            <div className="col" key={movie.imdbID}>
              <div
                className="movie-poster-wrapper"
                style={{
                  width: "250px",
                  height: "140px",
                  margin: "0 auto",
                  overflow: "hidden",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  className="img-fluid"
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/250x140?text=No+Image"
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Movie;
