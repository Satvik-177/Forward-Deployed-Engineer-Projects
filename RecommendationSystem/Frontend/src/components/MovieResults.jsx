import { useState, useEffect } from "react";
import { getMoviePosters } from "../services/movieService";
import "./MovieResults.css";

function MovieResults({ movies }) {
  const [posters, setPosters] = useState({});

  useEffect(() => {
    async function fetchPosters() {
      try {
        const titles = movies.map((movie) => movie.title);
        const data = await getMoviePosters(titles);

        const posterMap = {};

        data.forEach((movie) => {
          posterMap[movie.title] = movie.poster;
        });

        setPosters(posterMap);
      } catch (error) {
        console.error("Recommendation posters failed:", error);
      }
    }

    if (movies.length > 0) {
      fetchPosters();
    }
  }, [movies]);

  return (
    <section className="movie-results">
      <div className="results-heading">
        <div>
          <span className="results-tag">CURATED FOR YOUR TASTE</span>
          <h2>Recommended Movies</h2>
        </div>

        <span className="results-count">
          {movies.length} RESULTS
        </span>
      </div>

      <div className="movie-grid">
        {movies.map((movie, index) => (
          <article className="movie-card" key={movie.title}>
            <div
              className={`movie-poster poster-${index % 3}`}
              style={{
                backgroundImage: posters[movie.title]
                  ? `linear-gradient(to top, rgba(10,10,15,0.98), rgba(10,10,15,0.15)), url("${posters[movie.title]}")`
                  : undefined
              }}
            >
              <span className="poster-number">
                0{index + 1}
              </span>

              <div className="poster-overlay">
                <span className="poster-label">
                  CINEMATCH PICK
                </span>
                <h3>{movie.title}</h3>
              </div>
            </div>

            <div className="movie-details">
              <p>{movie.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MovieResults;
