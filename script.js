// Setup event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn'); // Select the Add Task button
    const taskInput = document.getElementById('task-input'); // Select the task input field
    const taskList = document.getElementById('task-list'); // Select the task list

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Retrieve and trim the task input value

        // Check if the input is not empty
        if (taskText === "") {
            alert("Please enter a task."); // Alert if input is empty
            return;
        }

        // Create a new li element for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText; // Set text content to the task

        // Add a class to the list item for styling
        listItem.classList.add('task-item'); // Add class 'task-item'

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove'; // Set button text
        removeButton.className = 'remove-btn'; // Add class to button
        removeButton.onclick = () => {
            taskList.removeChild(listItem); // Remove the task when button is clicked
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem); // Append the list item to the task list

        // Clear the input field
        taskInput.value = '';
    }

    // Attach event listeners
    addButton.addEventListener('click', addTask); // Call addTask when button is clicked
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(); // Call addTask when Enter key is pressed
        }
    });
});

