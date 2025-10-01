import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: "./.env" });

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

let TaskList = [];

app.get("/", (req, res) => res.render("index"));
app.get("/home", (req, res) => res.render("home"));
app.get("/form", (req, res) => res.render("form", { tasks: TaskList }));

app.post("/insertTask", (req, res) => {
  const { taskId, taskName, taskDesc, taskTime, taskDate, taskEfficiency } =
    req.body;
  TaskList.push({
    taskId,
    taskName,
    taskDesc,
    taskTime,
    taskDate,
    taskEfficiency,
  });
  return res.redirect("/form");
});

app.get("/editTask", (req, res) => {
  const taskId = req.query.id;
  const task = TaskList.find((t) => t.taskId === taskId);
  res.render("editTask", { task });
});

app.post("/updateTask", (req, res) => {
  const { taskId, taskName, taskDesc, taskTime, taskDate, taskEfficiency } =
    req.body;
  TaskList = TaskList.map((task) =>
    task.taskId === taskId
      ? { taskId, taskName, taskDesc, taskTime, taskDate, taskEfficiency }
      : task
  );
  res.redirect("/form");
});

app.get("/deleteTask", (req, res) => {
  const taskId = req.query.id;
  TaskList = TaskList.filter((t) => t.taskId !== taskId);
  res.redirect("/form");
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
