const express = require('express'); // loads the express framework
const cors = require('cors'); //allows requests from frontend...
const fs = require('fs'); //read and write files
const path = require('path'); //file paths

const app = express(); //creates the app
const PORT = 3000; //sets the port

app.use(cors()); //allows requests from frontend...
app.use(express.json()); //allows us to parse JSON bodies

const DATA_FILE = path.join(__dirname, 'todos.json'); //path to data file

// Load todos from file
function loadTodos() {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  }
  return [];
}

// Save todos to file
function saveTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

let todos = loadTodos();

// ---------- Routes ----------

app.get("/todos", (req, res) => {
    res.json(todos);
});

app.post("/todos", (req, res) => {
    const newTodo = {
        id: Date.now(), 
        text: req.body.text,
        completed: false
    };

    todos.push(newTodo);
    saveTodos(todos);

    res.status(201).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    saveTodos(todos);

    res.status(204).send();
});


app.listen(PORT, () => {
    console.log(`server running on https://localhost:${PORT}`);
});

