const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
const selectedTaskList = document.getElementById('selected-task-list');
const saveButton = document.getElementById('save-button');
const navToggle = document.getElementById('nav-toggle');
const navContent = document.getElementById('nav-content');

// Event Listeners
addTaskButton.addEventListener('click', addTaskFromButton);
taskInput.addEventListener('keydown', handleTaskInput);
taskList.addEventListener('click', handleTaskListClick); // Changed event target
navToggle.addEventListener('click', toggleNavDropdown);
selectedTaskList.addEventListener('DOMSubtreeModified', updateSaveButtonVisibility);

updateSaveButtonVisibility();

// Functions
function addTaskFromButton() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
}

function handleTaskInput(event) {
    if (event.key === 'Enter' && taskInput.value.trim() !== '') {
        const taskText = taskInput.value.trim();
        addTask(taskText);
        taskInput.value = '';
    }
}

function handleTaskListClick(event) {
    const clickedElement = event.target;

    if (clickedElement.classList.contains('selector-icon')) {
        const taskText = clickedElement.nextElementSibling.textContent;
        toggleSelected(clickedElement);
        if (clickedElement.classList.contains('selected')) {
            addSelectedTask(taskText);
        } else {
            removeSelectedTask(taskText);
        }
    } else if (clickedElement.classList.contains('trash-icon')) {
        removeTask(clickedElement);
    }
}

function addTask(taskText) {
    const isDuplicate = Array.from(taskList.children).some(taskItem => {
        const existingTaskText = taskItem.querySelector('span').textContent;
        return existingTaskText === taskText;
    });

    if (!isDuplicate) {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
    } else {
        alert('Task already exists in the list!');
    }
}

// Create a task item element
function createTaskItem(taskText) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <div class="selector-icon"></div>
        <span>${taskText}</span>
        <span class="trash-icon" onclick="removeTask(this)"><i class="fas fa-trash-alt"></i></span>
    `;
    return taskItem;
}

// Toggle selection on the selector icon
function toggleSelected(selectorIcon) {
    selectorIcon.classList.toggle('selected');
    updateSaveButtonVisibility();
}

// Add a task to the selected list
function addSelectedTask(taskText) {
    const selectedTaskItem = document.createElement('li');
    selectedTaskItem.className = 'selected-task-item';
    selectedTaskItem.textContent = taskText;
    selectedTaskList.appendChild(selectedTaskItem);
    updateSaveButtonVisibility();
}

// Remove a task from the list
function removeTask(iconElement) {
    const taskItem = iconElement.closest('.task-item');
    const taskText = taskItem.querySelector('span').textContent;

    if (taskItem.querySelector('.selector-icon').classList.contains('selected')) {
        removeSelectedTask(taskText);
    }

    taskList.removeChild(taskItem);
}

// Add a task to the selected list
function addSelectedTask(taskText) {
    const selectedTaskItem = document.createElement('li');
    selectedTaskItem.className = 'selected-task-item';
    selectedTaskItem.textContent = taskText;
    selectedTaskList.appendChild(selectedTaskItem);
}

// Remove a task from the selected list
function removeSelectedTask(taskText) {
    const selectedTaskItems = document.querySelectorAll('.selected-task-item');
    selectedTaskItems.forEach(item => {
        if (item.textContent === taskText) {
            selectedTaskList.removeChild(item);
        }
    });
    updateSaveButtonVisibility();
}

// Update the visibility of the Save button
function updateSaveButtonVisibility() {
    saveButton.style.display = selectedTaskList.childElementCount > 0 ? 'block' : 'none';
}

// Toggle the navigation dropdown
function toggleNavDropdown() {
    navContent.classList.toggle('active');
}