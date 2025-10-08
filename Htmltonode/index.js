const express = require("express");
const app = express();
const PORT = 3000;

// view engine setup
app.set("view engine", "ejs");

// routes
app.get("/", (req, res) => {
  res.render("index", );
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
