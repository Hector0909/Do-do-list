var prevUpdateButton = null;
var selectedTask = null;
var taskIndex = null;
var clickedUpdate = false;

// Event delegation: Listen for clicks on the entire task list
const taskList = document.querySelector("ol");

function addTaskToList() {

  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();

  // Only adds a task if the text input in the textarea element is not empty
  if (taskText) {
    const taskList = document.querySelector("ol");
    
    // Add task at the selected index
    if (selectedTask){
      var index = Array.prototype.indexOf.call(taskList.children, selectedTask);
      var secondLi = taskList.querySelector('li:nth-child(' + (index + 1) + ')');

      // Create a new <li> element
      var newLi = document.createElement('li');
      newLi.textContent = taskText;
      
      // Insert the new <li> element before the second <li> element
      taskList.insertBefore(newLi, secondLi);
      return
    }
    
    // Add task at the last position in the list
    const newTaskItem = document.createElement("li");
    newTaskItem.textContent = taskText;
    taskList.appendChild(newTaskItem);
  }
}

function deleteTask(){
  if(selectedTask){
    selectedTask.remove();
  }
}

function deselectTask(){
  selectedTask.style.color = "black";
  selectedTask.querySelector("button").remove();
  selectedTask = null;
}


function updateTask(){

  const taskInput = document.getElementById("task");
  const newTaskText = taskInput.value.trim();
  selectedTask.textContent = newTaskText;

  var updateButton = document.createElement("button");
  prevUpdateButton = updateButton; // Update the reference to the current button


  // Re-renders the update button since it gets deleted when the text content is changed
  updateButton.innerHTML = "Update task";
  updateButton.style.float = "right";
  selectedTask.appendChild(updateButton);

  // Adds the event listener for the  re-rendered update button
  updateButton.addEventListener("click", updateTask);
}

// Selects task when the task is clicked
function selectTask(event){
  const clickedItem = event.target;

  if (clickedItem.tagName === "LI" && !clickedItem.querySelector("button")) {
    taskIndex =  Array.prototype.indexOf.call(taskList.children, clickedItem);
    
    // Change the color of the clicked text to green
    clickedItem.style.color = "red";

    // Switch the color of the previously clicked text to black
    if(selectedTask){
      selectedTask.style.color = "black";
    }

    // Saves the task that was clicked in case the user wants to delete it
    selectedTask = clickedItem; 

    if (prevUpdateButton !== null) {
      prevUpdateButton.remove(); // Remove the previous update button
    }
    
    var updateButton = document.createElement("button");
    prevUpdateButton = updateButton; // Update the reference to the current button

    updateButton.innerHTML = "Update task";
    updateButton.style.float = "right";
    clickedItem.appendChild(updateButton); // Adds  the update button for the task

    // Adds an event listener for the update button
    updateButton.addEventListener("click", updateTask); 
  }
  else if(clickedItem.style.color == "red"){
    deselectTask();
  }
}

// Add an event listener to the "Add Task" button
const addButton = document.getElementById("addTaskButton");
const deleteButton = document.getElementById("deleteTaskButton");
taskList.addEventListener("click",selectTask);
addButton.addEventListener("click", addTaskToList);
deleteButton.addEventListener("click",deleteTask);