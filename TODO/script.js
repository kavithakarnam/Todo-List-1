const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task');
const newTaskInput = document.getElementById('new-task');
const prioritySelect = document.getElementById('priority');
const dueDateInput = document.getElementById('due-date');

let tasks = []; // Array to store tasks

function updateTaskList() {
  taskList.innerHTML = ''; // Clear existing list items

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    const taskText = document.createElement('span');
    const dueDateSpan = document.createElement('span');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    taskText.innerText = task.description;
    dueDateSpan.innerText = task.dueDate ? `Due: ${task.dueDate}` : '';
    editButton.innerText = 'Edit';
    deleteButton.innerText = 'delete';
    editButton.classList.add('edit-button');
    deleteButton.classList.add('delete-button');
    listItem.classList.add(task.priority); // Add priority class for styling

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(dueDateSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    // Add event listeners for edit and delete buttons
    editButton.addEventListener('click', function() {
      const editIndex = tasks.findIndex(
        (task) => task.description === taskText.innerText
      );
      const newDescription = prompt("Enter new description for the task:");
      const newPriority = prioritySelect.value;
      const newDueDate = dueDateInput.value;
      if (newDescription) {
        tasks[editIndex].description = newDescription;
        tasks[editIndex].priority = newPriority;
        tasks[editIndex].dueDate = newDueDate;
        updateTaskList();
      }
    });

    deleteButton.addEventListener('click', function() {
      const deleteIndex = tasks.findIndex(
        (task) => task.description === taskText.innerText
      );
      tasks.splice(deleteIndex, 1);
      updateTaskList();
    });
  });
}

addTaskButton.addEventListener('click', function() {
  const newTask = newTaskInput.value.trim();
  const priority = prioritySelect.value;
  const dueDate = dueDateInput.value;
  if (newTask) {
    tasks.push({ description: newTask, completed: false, priority, dueDate });
    updateTaskList();
    newTaskInput.value = '';
    prioritySelect.value = 'low'; // Reset priority to default
    dueDateInput.value = ''; // Reset due date
  }
});

taskList.addEventListener('click', function(event) {
  // Existing logic for handling delete button clicks remains here
  if (event.target.classList.contains('delete-button')) {
    const deleteIndex = tasks.findIndex(
      (task) => task.description === event.target.parentElement.querySelector('span').innerText
    );
    tasks.splice(deleteIndex, 1);
    updateTaskList();
  }
});
