// import { useState } from "react";
// import "./SearchBar.css";
// import { searchMovies } from "../services/movieService";

// function SearchBar({ onResults, onSearchQuery }) {
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function handleSearch() {
//     if (!query.trim()) return;

//     try {
//       setLoading(true);
//       setError("");

//       onSearchQuery(query);

//       const movies = await searchMovies(query);
//       onResults(movies);

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="search-box">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") handleSearch();
//         }}
//         placeholder="Search by movie, genre, mood or story..."
//       />

//       <button type="button" onClick={handleSearch} disabled={loading}>
//         {loading ? "Searching..." : "⌕ Discover"}
//       </button>

//       {error && <p className="search-error">{error}</p>}
//     </div>
//   );
// }

// export default SearchBar;

import { useState } from "react";
import "./SearchBar.css";
import { searchMovies } from "../services/movieService";

function SearchBar({ onResults }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!query.trim() || loading) return;

    try {
      setLoading(true);
      setError("");

      const movies = await searchMovies(query);
      await onResults(movies, query);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="search-box">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        placeholder="Search by movie, genre, mood or story..."
      />

      <button type="button" onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "⌕ Discover"}
      </button>

      {error && <p className="search-error">{error}</p>}
    </div>
  );
}

export default SearchBar;
