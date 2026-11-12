# CineMatch – AI-Powered Movie Recommendation System

Discover your next favourite movie with **CineMatch**, a semantic movie discovery and recommendation application that understands natural-language queries, moods, and movie preferences.

Instead of relying only on exact title or genre matching, CineMatch uses AI-generated text embeddings and cosine similarity to find movies with semantically related descriptions.

## Features

AI-Powered Semantic Search: Search for movies using natural-language queries, genres, moods, themes, or story descriptions.

Similar Movie Recommendations: Select a movie from the catalog to discover other movies with similar descriptions.

Cosine Similarity: Uses vector embeddings and cosine similarity to measure semantic relevance between movies.

Dynamic Movie Catalog: Displays 12 randomly selected movies from a collection of 30 movies.

TMDB Poster Integration: Fetches actual movie posters dynamically using The Movie Database (TMDB) API.

Responsive Interface: Dark, cinematic UI designed to work across desktop, tablet, and mobile devices.

Dedicated Recommendation Section: Displays the top three recommended movies separately from the movie catalog.


## Screenshots

### Homepage
![Homepage](screenshots/homepage.png)

### AI Recommendations
![Recommendations](screenshots/recommendations.png)

### Movie Catalog
![Movie Catalog](screenshots/catalog.png)

### Semantic Search
![Semantic Search](screenshots/search.png)



## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML, CSS |
| Backend | Node.js, Express.js |
| AI / Embeddings | Google Gemini Embeddings (`gemini-embedding-001`) |
| Recommendation Algorithm | Cosine Similarity |
| External API | TMDB API |
| Development Tools | Vite, npm, Git, GitHub |

## How It Works

CineMatch follows a semantic recommendation approach using text embeddings.

### 1. Movie Data Initialization
- Movie information is maintained in a JSON-based catalog.
- During backend initialization, movie descriptions are converted into numerical vector embeddings using Google's Gemini Embedding model.
- These embeddings are maintained in memory for similarity calculations.

### 2. Semantic Search
- The user enters a natural-language query, such as "movies about space exploration and survival".
- The query is converted into an embedding using the same embedding model.
- The backend calculates cosine similarity between the query embedding and movie embeddings.
- Movies are ranked by similarity, and the top three results are returned.

### 3. Similar Movie Recommendations
- Users can select a movie from the catalog.
- Its embedding is compared against the embeddings of other movies.
- The selected movie is excluded from the results.
- The three most similar movies are returned.

### 4. Movie Poster Retrieval
- The frontend sends movie titles to the backend.
- The backend uses the TMDB API to search for corresponding movies and retrieve poster paths.
- Poster URLs are returned to the frontend and displayed on movie cards.

## Recommendation Algorithm

CineMatch uses **Cosine Similarity** to measure the similarity between two embedding vectors.

The formula is:

\[
\text{Cosine Similarity}(A,B)=
\frac{A\cdot B}{\|A\|\|B\|}
\]

A higher similarity score indicates that two vectors point in a more similar direction.

This enables semantic matching beyond simple keyword-based search.

## Project Structure

```text
Netflix-Recommendation/
│
├── Backend/
│   ├── config/
│   │   └── embedding.js
│   ├── controllers/
│   │   └── movie.controller.js
│   ├── data/
│   │   └── movies.json
│   ├── routes/
│   │   └── movie.routes.js
│   ├── service/
│   │   ├── movie.service.js
│   │   └── tmdb.service.js
│   ├── utils/
│   │   └── similarity.js
│   ├── .env
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   │   └── movieService.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── index.html
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm
- Google AI API key for Gemini embeddings
- TMDB API Read Access Token

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

cd Netflix-Recommendation
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the Backend directory:

```env
PORT=8000
GOOGLE_API_KEY=your_google_api_key
TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token
```

Make sure the Google API key variable matches the name configured in `config/embedding.js`.

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open the local URL provided by Vite, usually:

```text
http://localhost:5173
```

The backend runs on port `8000` by default.

## API Endpoints

Base URL: `http://localhost:8000/api/movies`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/search` | Searches movies using a natural-language query |
| GET | `/:title/similar` | Retrieves similar movies for a selected title |
| POST | `/posters` | Retrieves TMDB poster URLs for multiple movie titles |

### Example: Semantic Search

**Request**

```http
POST /api/movies/search
Content-Type: application/json
```

```json
{
  "query": "movies about space exploration and survival"
}
```

### Example: Similar Movies

```http
GET /api/movies/Interstellar/similar
```

### Example: Fetch Movie Posters

```http
POST /api/movies/posters
Content-Type: application/json
```

```json
{
  "titles": ["Interstellar", "Inception", "The Dark Knight"]
}
```

## Current Scope and Future Improvements

The current implementation uses a JSON-based movie catalog and in-memory embeddings to demonstrate semantic search and recommendation workflows.

Potential improvements include:

- Integrating a vector database for persistent and scalable embedding storage.
- Adding genre-aware filtering and hybrid recommendation strategies.
- Expanding the movie dataset.
- Introducing user profiles and personalized recommendations.
- Implementing caching and optimized embedding retrieval.

## External Services and Attribution

- **Google Gemini:** Used for generating text embeddings.
- **TMDB:** Used for movie metadata and poster retrieval.

This product uses the TMDB API but is not endorsed or certified by TMDB.

TMDB documentation: https://developer.themoviedb.org/docs

## Security

- API credentials are stored in environment variables.
- Never commit `.env` files or expose API tokens in the frontend.
- Add `.env` to `.gitignore` before pushing the project to GitHub.

## License

No license has been specified for this project yet.