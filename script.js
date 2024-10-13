// Setup event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // Load tasks from Local Storage on page load

    const addButton = document.getElementById('add-task-btn'); // Select the Add Task button
    const taskInput = document.getElementById('task-input'); // Select the task input field
    const taskList = document.getElementById('task-list'); // Select the task list

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Check if taskText is provided
        if (taskText === undefined || taskText.trim() === "") {
            return; // Prevent adding an empty task
        }

        // Create a new li element for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText; // Set text content to the task
        listItem.classList.add('task-item'); // Add class 'task-item'

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove'; // Set button text
        removeButton.className = 'remove-btn'; // Add class to button
        removeButton.onclick = () => {
            taskList.removeChild(listItem); // Remove the task when button is clicked
            removeTaskFromLocalStorage(taskText); // Remove from Local Storage
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem); // Append the list item to the task list

        // Save to Local Storage if needed
        if (save) {
            saveTaskToLocalStorage(taskText);
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); // Filter out the removed task
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update Local Storage
    }

    // Attach event listeners
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim(); // Get trimmed value from input
        addTask(taskText); // Call addTask with user input
    });
    
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim(); // Get trimmed value from input
            addTask(taskText); // Call addTask with user input
        }
    });
});
