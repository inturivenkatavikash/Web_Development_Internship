// Week 3 — To-Do List (Enhanced with filters and stats)

const todoInput   = document.getElementById('todo-input');
const addBtn      = document.getElementById('add-btn');
const todoList    = document.getElementById('todo-list');
const emptyState  = document.getElementById('empty-state');
const totalCount  = document.getElementById('total-count');
const doneCount   = document.getElementById('done-count');
const pendingCount= document.getElementById('pending-count');
const filterBtns  = document.querySelectorAll('.filter-btn');

let tasks = [];        // { text, completed }
let currentFilter = 'all';

// ── Add task ──────────────────────────────────────────────
function addTodo() {
  const taskText = todoInput.value.trim();
  if (taskText === '') return;

  tasks.push({ text: taskText, completed: false });
  todoInput.value = '';
  todoInput.focus();

  renderList();
  updateStats();
}

// ── Render list based on filter ───────────────────────────
function renderList() {
  todoList.innerHTML = '';

  const filtered = tasks.filter(t => {
    if (currentFilter === 'done')    return t.completed;
    if (currentFilter === 'pending') return !t.completed;
    return true;
  });

  if (filtered.length === 0) {
    emptyState.classList.add('visible');
  } else {
    emptyState.classList.remove('visible');
  }

  filtered.forEach((task, filteredIndex) => {
    // Find the actual index in tasks array
    const actualIndex = tasks.indexOf(task);

    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const checkEl = document.createElement('div');
    checkEl.className = 'task-check';
    checkEl.textContent = task.completed ? '✓' : '';

    const textEl = document.createElement('span');
    textEl.className = 'task-text';
    textEl.textContent = task.text;

    // Toggle completed on click
    li.addEventListener('click', () => {
      tasks[actualIndex].completed = !tasks[actualIndex].completed;
      renderList();
      updateStats();
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks.splice(actualIndex, 1);
      renderList();
      updateStats();
    });

    li.appendChild(checkEl);
    li.appendChild(textEl);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

// ── Update stats bar ──────────────────────────────────────
function updateStats() {
  const total   = tasks.length;
  const done    = tasks.filter(t => t.completed).length;
  const pending = total - done;
  totalCount.textContent   = total;
  doneCount.textContent    = done;
  pendingCount.textContent = pending;
}

// ── Filter buttons ────────────────────────────────────────
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderList();
  });
});

// ── Event listeners ───────────────────────────────────────
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

// Initial render
renderList();
updateStats();