import mongoose from "mongoose";

const jokeSchema = new mongoose.Schema({
    category: { type: String },
    author: { type: String },
    joke: { type: String, required: true },
    rating: {
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 }
    }
})

const Joke = mongoose.model("Joke", jokeSchema);

export default Joke;