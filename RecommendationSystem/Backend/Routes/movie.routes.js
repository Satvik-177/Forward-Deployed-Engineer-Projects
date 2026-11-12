import express from "express"
import { getSimilarMovieController, searchMovieController } from "../controllers/movie.controller.js";
import { getMoviePostersController } from "../controllers/movie.controller.js";

const router = express.Router()

router.post("/search", searchMovieController)
router.post("/posters", getMoviePostersController);
router.get("/:title/similar", getSimilarMovieController)

export default router