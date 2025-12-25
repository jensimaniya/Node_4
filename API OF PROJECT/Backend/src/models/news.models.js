import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true },
    content: { type: String },
    category: { type: String, default: "general" },
    country: { type: String },
    author: { type: String },
})

const News = mongoose.model("News", newsSchema);

export default News;