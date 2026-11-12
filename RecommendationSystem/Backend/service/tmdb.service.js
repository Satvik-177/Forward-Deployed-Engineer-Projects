import dotenv from "dotenv";

dotenv.config();

export async function searchMoviePoster(title) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        accept: "application/json"
      }
    }
  );

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  const data = await response.json();

  const movie = data.results?.find(
    (item) =>
      item.title.toLowerCase() === title.toLowerCase()
      && item.poster_path
  );

  if (!movie) return null;

  return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
}
