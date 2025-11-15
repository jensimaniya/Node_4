import Movie from "../models/Movie.js";

export const getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.render("movies", { movies });
};

export const renderAddForm = (req, res) => {
  res.render("addMovie");
};

export const addMovie = async (req, res) => {
  const { title, year, rating } = req.body;
  await Movie.create({ title, year, rating });
  res.redirect("/");
};

export const renderEditForm = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render("editMovie", { movie });
};

export const updateMovie = async (req, res) => {
  const { title, year, rating } = req.body;
  await Movie.findByIdAndUpdate(req.params.id, { title, year, rating });
  res.redirect("/");
};

export const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
