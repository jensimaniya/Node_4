import express from "express";
import { getAllMovies, renderAddForm, addMovie, renderEditForm, updateMovie, deleteMovie } from "../controllers/movieController.js";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/movies/add", renderAddForm);
router.post("/movies", addMovie);
router.get("/movies/edit/:id", renderEditForm);
router.put("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);

export default router;
