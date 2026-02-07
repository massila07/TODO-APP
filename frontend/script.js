const API_URL = "http://localhost:3000/todos";

const list = document.getElementById("todo-list");
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  input.value = "";
  loadTodos();
});

// Function to load todos from backend
async function loadTodos() {
  const response = await fetch(API_URL);
  const todos = await response.json();

  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todo.text;

    const button = document.createElement("button");
    button.textContent = "❌";

    button.addEventListener("click", async () => {
      await fetch(`${API_URL}/${todo.id}`, {
        method: "DELETE"
      });
      loadTodos();
    });

    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);
  });
}

// Call loadTodos when page opens
loadTodos();
