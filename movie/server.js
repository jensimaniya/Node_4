import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
const PORT = 2391;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend", "views"));
app.use(express.static(path.join(__dirname, "frontend", "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://127.0.0.1:27017/moviedb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


app.use("/", movieRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
