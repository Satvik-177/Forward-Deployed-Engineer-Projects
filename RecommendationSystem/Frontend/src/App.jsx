// import "./App.css";
// import Navbar from "./components/Navbar";
// import SearchBar from "./components/SearchBar";
// import MovieResults from "./components/MovieResults";
// import Catalog from "./components/Catalog";
// import { useState } from "react";
// import { getSimilarMovies } from "./services/movieService";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [catalogLoading, setCatalogLoading] = useState(false);

//   const filteredMovies = movies.filter((movie) => {
//     const query = searchQuery.toLowerCase().trim();
//     const title = movie.title.toLowerCase().trim();

//     return !query.includes(title);
//   });

//   async function handleCatalogSelect(title) {
//     try {
//       setSearchQuery(title);
//       setMovies([]);
//       setCatalogLoading(true);

//       const similarMovies = await getSimilarMovies(title);
//       setMovies(similarMovies);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setCatalogLoading(false);
//     }
//   }

//   return (
//     <div className="app">
//       <Navbar />

//       <main>
//         <section className="hero">
//           <span className="hero-tag">YOUR PERSONAL AI MOVIE GUIDE</span>

//           <h1>
//             Find your next
//             <span> favourite movie.</span>
//           </h1>

//           <p>
//             Discover movies that match your taste.
//             Just describe what you feel like watching.
//           </p>

//           <SearchBar
//             onResults={setMovies}
//             onSearchQuery={setSearchQuery}
//           />
//         </section>

//         {catalogLoading && <p className="catalog-loading">Finding similar movies...</p>}

//         {filteredMovies.length > 0 && (
//           <MovieResults movies={filteredMovies} />
//         )}

//         <Catalog onMovieSelect={handleCatalogSelect} />
//       </main>
//     </div>
//   );
// }

// export default App;



import "./App.css";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import MovieResults from "./components/MovieResults";
import Catalog from "./components/Catalog";
import { useState } from "react";
import { getSimilarMovies } from "./services/movieService";

function App() {
  const [movies, setMovies] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(false);

  async function handleSearchResults(results, query) {
    const normalizedQuery = query.toLowerCase().trim();

    const searchedMovie = results.find((movie) =>
      normalizedQuery.includes(movie.title.toLowerCase().trim())
    );

    if (searchedMovie) {
      try {
        const similarMovies = await getSimilarMovies(searchedMovie.title);
        setMovies(similarMovies);
      } catch (error) {
        console.error(error);
        setMovies(results.filter(
          (movie) => movie.title !== searchedMovie.title
        ));
      }
    } else {
      setMovies(results);
    }
  }

  async function handleCatalogSelect(title) {
    try {
      setMovies([]);
      setCatalogLoading(true);

      const similarMovies = await getSimilarMovies(title);
      setMovies(similarMovies);
    } catch (error) {
      console.error(error);
    } finally {
      setCatalogLoading(false);
    }
  }

  return (
    <div className="app">
      <Navbar />

      <main>
        <section className="hero">
          <span className="hero-tag">YOUR PERSONAL AI MOVIE GUIDE</span>

          <h1>
            Find your next
            <span> favourite movie.</span>
          </h1>

          <p>
            Discover movies that match your taste.
            Just describe what you feel like watching.
          </p>

          <SearchBar onResults={handleSearchResults} />
        </section>

        {catalogLoading && (
          <p className="catalog-loading">Finding similar movies...</p>
        )}

        {movies.length > 0 && (
          <MovieResults movies={movies} />
        )}

        <Catalog onMovieSelect={handleCatalogSelect} />
      </main>
    </div>
  );
}

export default App;
