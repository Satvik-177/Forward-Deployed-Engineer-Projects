import { useState, useEffect } from "react";
import { getMoviePosters } from "../services/movieService";
import "./Catalog.css";

const catalogMovies = [
  "Interstellar",
  "Inception",
  "The Dark Knight",
  "The Martian",
  "Gravity",
  "The Matrix",
  "Shutter Island",
  "Avatar",
  "Arrival",
  "Blade Runner 2049",
  "Dune",
  "Tenet",
  "Edge of Tomorrow",
  "Predestination",
  "Ex Machina",
  "The Prestige",
  "Gone Girl",
  "Prisoners",
  "Se7en",
  "Fight Club",
  "The Shawshank Redemption",
  "Forrest Gump",
  "The Green Mile",
  "The Pursuit of Happyness",
  "La La Land",
  "The Grand Budapest Hotel",
  "John Wick",
  "Mad Max: Fury Road",
  "Spider-Man: Into the Spider-Verse",
  "Coco"
];

function getRandomMovies(movies, count) {
  const shuffled = [...movies];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

function Catalog({ onMovieSelect }) {
  const [visibleMovies] = useState(() =>
    getRandomMovies(catalogMovies, 12)
  );

  const [posters, setPosters] = useState({});

  useEffect(() => {
    async function fetchPosters() {
      try {
        const data = await getMoviePosters(visibleMovies);

        const posterMap = {};

        data.forEach((movie) => {
          posterMap[movie.title] = movie.poster;
        });

        setPosters(posterMap);
      } catch (error) {
        console.error("Poster fetching failed:", error);
      }
    }

    fetchPosters();
  }, [visibleMovies]);

  return (
    <section className="catalog-section" id="catalog">
      <div className="catalog-heading">
        <div>
          <span className="results-tag">EXPLORE OUR COLLECTION</span>
          <h2>Explore Movie Catalog</h2>
          <p>
            Browse our collection and pick a movie to discover similar titles.
          </p>
        </div>

        <span className="results-count">
          {visibleMovies.length} MOVIES
        </span>
      </div>

      <div className="catalog-grid">
        {visibleMovies.map((title, index) => (
          <button
            className="catalog-card"
            key={title}
            style={{
              backgroundImage: posters[title]
                ? `linear-gradient(to top, rgba(10,10,15,0.98), rgba(10,10,15,0.15)), url("${posters[title]}")`
                : undefined
            }}
            onClick={() => onMovieSelect(title)}
          >
            <span className="catalog-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="catalog-title">{title}</span>

            <span className="catalog-action">
              Find similar movies ↗
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Catalog;
