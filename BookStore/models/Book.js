import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: String,
  genre: String,
  price: Number,
  issueDate: Date,
  returnDate: Date,
  studentName: String,
  studentId: String,
  isbn: { type: String, unique: false } // ❌ Remove unique index
});

export default mongoose.model("Book", bookSchema);
