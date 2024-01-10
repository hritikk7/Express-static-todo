const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

let todos = [
  {
    id: 234532,
    title: "task1",
    description: "task1 description",
  },
];

app.get("/", (req, res) => {
  res.send("hello, change the route to /todos to retrive all todos");
});

app.get("/todos", (req, res) => {
  console.log("getting all the todos");
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  let matchingTodo = todos.filter((todo) => {
    if (todo.id === todoId) {
      return todo;
    }
  });
  console.log("matchingTodo", matchingTodo);
  if (matchingTodo.length == 0) {
    res.send("Not found");
  } else {
    res.json(matchingTodo);
  }
});

app.post("/todos", (req, res) => {
  let incomingTodo = req.body;
  let random = Math.floor(Math.random() * 1000000);
  let tempTodo = {
    id: random,
    ...incomingTodo,
  };
  todos.push(tempTodo);
  res.json({
    message: "Todo added!!",
  });
});

app.put("/todos/:id", (req, res) => {
    const todoId = parseInt(req.params.id)
    let updatedTitle = req.body.title
    let updatedDesc = req.body.description
    // console.log(updatedDesc, updatedTitle);
    let originalTodo = todos.find((todo)=>{
        todo.id == todoId
    })
    if(!originalTodo){
        res.status(404).send("Todo Not Found")
    }
    originalTodo.title = updatedTitle
    originalTodo.description = updatedDesc
    console.log(originalTodo);
    res.json({
        "message" : "Updated Todo"
    })  
});

app.listen(port, () => {
  console.log("listning");
});
