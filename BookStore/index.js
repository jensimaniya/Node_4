import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import Book from "./models/Book.js";

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

mongoose
  .connect("mongodb+srv://book:book_123@cluster0.5yrqclh.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// routes
app.get("/", async (req, res) => {
  const books = await Book.find();
  res.render("index", { books });
});

app.get("/add", (req, res) => {
  res.render("addBook");
});

app.post("/add", async (req, res) => {
  const { title, author, publisher, genre, price, issueDate, returnDate, studentName, studentId } = req.body;
  const newBook = new Book({ title, author, publisher, genre, price, issueDate, returnDate, studentName, studentId });
  await newBook.save();
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("editBook", { book });
});

app.post("/edit/:id", async (req, res) => {
  const { title, author, publisher, genre, price, issueDate, returnDate, studentName, studentId } = req.body;
  await Book.findByIdAndUpdate(req.params.id, { title, author, publisher, genre, price, issueDate, returnDate, studentName, studentId });
  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
