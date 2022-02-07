const addTodoForm  = document.querySelector('.add-todo-form');
const todoTasks  = document.querySelector('.todo-tasks');
const todoFilter  = document.querySelector('.todo-filter');

addTodoForm.addEventListener('submit', handleSubmit);
todoTasks.addEventListener('click', selectTodo);

const taskLists = [];
function handleSubmit(e) {
    e.preventDefault();
    todoFilter.style.display = 'flex';

    // input value
    const task = e.target.insert.value;

    // create task & unique id
    const item = {
        id: Date.now(),
        task,
        isCompleted: false,
    }
    taskLists.push(item);

    // reset input value
    /* e.target.insert.value = ''; */
    e.target.reset();

    displayTasks();

    saveItemsIntoLocalStorage();
}

function addHtmlForListItem (items) {
    if(Array.isArray(items)) {
        return items.map(item => `
        <li class="todo-item">
            <input type="checkbox" class="checkbox" />
            ${item.task}
            <button class="delete-todo">&times;</button>
        </li>
        `).join('');
    }
    else {
        return '';
    }
}

function selectTodo (e) {
    const selectItem = e.target;
    if (selectItem.classList[0] === 'delete-todo') {
        const deleteTodoItem = selectItem.parentNode;
        deleteTodoItem.remove();
    }

    if (selectItem.classList[0] === 'checkbox') {
        const todoItem = selectItem.parentNode;
        todoItem.classList.add('select-checkbox');
    }
}

function displayTasks() {
    const html = addHtmlForListItem(taskLists);
    todoTasks.innerHTML = html;
}

function saveItemsIntoLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskLists));
}

function displayTasksFromLocalStorage() {
    const tasksFromLs = JSON.parse(localStorage.getItem('tasks'));
    const html = addHtmlForListItem(tasksFromLs);
    todoTasks.innerHTML = html;
    todoFilter.style.display = 'flex';
}

displayTasksFromLocalStorage();