import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import embeddingModel from "../config/embedding.js";
import cosineSimilarity from "../Utils/similarity.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let movies = [];

const initializeMovies = async () => {

    const filePath = path.join(__dirname, "../data/movies.json");

    const fileData = await fs.readFile(filePath, "utf-8");

    const movieData = JSON.parse(fileData);

    const descriptions = movieData.map(movie => movie.description);

    const embeddings = await embeddingModel.embedDocuments(descriptions);

    movies = movieData.map((movie, index) => ({
        ...movie,
        embedding: embeddings[index]
    }));

    console.log(`${movies.length} movies loaded with embeddings.`);
};

const searchMovies = async(query)=>{
    
    const queryEmbedding = await embeddingModel.embedQuery(query)

    const matches = movies.map(movie=>{

        const similarity = cosineSimilarity(
            queryEmbedding,
            movie.embedding
        )

        return{

            title:movie.title,
            description:movie.description,
            match:similarity
        }

    });

    matches.sort((a,b) => b.match - a.match)

    return matches.slice(0,3)
    
};

const getSimilarMovies = async(title)=>{

    const selectedMovie = movies.find(

        movie => movie.title.toLowerCase() === title.toLowerCase()
   
    )

    if(!selectedMovie){

        throw new Error(`Movie not found ${title}`)
    }

    const matches = movies
       .filter(movie => movie.title !== selectedMovie.title)
       .map(movie=>{

        const similarity = cosineSimilarity(
            selectedMovie.embedding,
            movie.embedding
        )

        return {

            title:movie.title,
            description:movie.description,
            match:similarity
       }
    });

    matches.sort((a,b) => b.match - a.match)

    return matches.slice(0,3)
};

export { initializeMovies, searchMovies, getSimilarMovies }

