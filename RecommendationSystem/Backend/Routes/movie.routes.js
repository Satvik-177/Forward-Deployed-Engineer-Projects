import express from "express"
import { getSimilarMovieController, searchMovieController } from "../controllers/movie.controller.js";

const router = express.Router()

router.post("/search", searchMovieController)
router.get("/:title/similar", getSimilarMovieController)

export default router