var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    // Reset form input fields
    formEl.reset();

    // Package data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // Send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
    // Create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Create a task ID as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // Create div to hold task infor and add to list item
    var taskInfoEl = document.createElement("div");
    // Give it a class name
    taskInfoEl.className = "task-info";

    // Add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // create task action buttons and dropdown list with unique IDs using createTaskActions function
    var taskActionsEl = createTaskActions(taskIdCounter);
    // pass info into HTML code listItemEl
    listItemEl.appendChild(taskActionsEl);
    // pass info into HTML code tasksToDoEl
    tasksToDoEl.appendChild(listItemEl);

    // Add entire item to list
    tasksToDoEl.appendChild(listItemEl);

    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    // create div container
    var actionContainerEl = document.createElement("div");
    // assign attributes
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    // assign attributes
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    // pass info into parent HTML code actionContainerEl
    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    // assign attributes
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    // pass info into parent HTML code actionContainerEl
    actionContainerEl.appendChild(deleteButtonEl);

    // create status dropdown
    var statusSelectEl = document.createElement("select");
    // assign attributes
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    // pass info into parent HTML code actionContainerEl
    actionContainerEl.appendChild(statusSelectEl);

    // create status choices array
    var statusChoices = ["To Do", "In Progress", "Completed"];

    // create for loop
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionsEl = document.createElement("option");
        // assign attributes
        statusOptionsEl.textContent = statusChoices[i];
        statusOptionsEl.setAttribute("value", statusChoices[i]);

        // pass info into HTML code statusSelectEl
        statusSelectEl.appendChild(statusOptionsEl);
    }

    return actionContainerEl;

};

formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (event.target.matches(".edit-btn")) {
        // get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;

    var taskType = document.querySelector("span.task-type").textContent;
    document.querySelector("select[name='task-type']").value = taskType;

    // change "add task"" button to say "save task" when editing.
    document.querySelector("#save-task").textContent = "Save Task";

    // include the task's id
    formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId) {
    // select a task item with the taskId equal to the argument passed through the funtion
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

pageContentEl.addEventListener("click", taskButtonHandler);