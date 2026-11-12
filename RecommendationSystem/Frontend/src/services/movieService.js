const API_URL = "http://localhost:8000/api/movies";

export async function searchMovies(query) {
  const response = await fetch(`${API_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to search movies");
  }

  return result.data;
}

export async function getSimilarMovies(title) {
  const response = await fetch(
    `${API_URL}/${encodeURIComponent(title)}/similar`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch similar movies");
  }

  return result.data;
}

export async function getMoviePosters(titles) {
  const response = await fetch(`${API_URL}/posters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ titles })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch movie posters");
  }

  return result.data;
}
