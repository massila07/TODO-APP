const API_URL = "http://localhost:3000/todos";

const list = document.getElementById("todo-list");

// Function to load todos from backend
async function loadTodos() {
  const response = await fetch(API_URL); // Fetch todos
  const todos = await response.json();   // Convert response to array

  list.innerHTML = ""; // Clear list
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    list.appendChild(li);
  });
}

// Call loadTodos when page opens
loadTodos();
