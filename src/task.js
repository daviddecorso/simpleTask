// Create date object and day array
var currentDate = new Date();
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Task class
class Task {
  constructor(name, date, length, priority) {
    this.name = name;

    this.date = date;

    this.length = length;

    this.priority = priority;

    /* if (priority == null) {
      priority = "normal";
    } else {
      this.priority = priority;
    } */
  }
}

// Setup stores
const Store = require("electron-store");

const firstTime = {
  isStored: {
    type: Boolean,
  },
};

const taskList = {
  taskArray: {
    type: Object,
  },
};

// Create stores and tasks array
const firstTimeCheck = new Store({ firstTime });
const store = new Store({ taskList });
var tasks = new Array();

// Check if this is the first time running the app on this device
if (firstTimeCheck.get("firstTime") == undefined) {
  firstTimeCheck.set("firstTime", true);
  store.set("taskList", tasks);
  console.log("First time setup!");
}

// Initialize task length variables
let average = 0;
let totalHrs = 0;
let numTasks = 0;

if (store.get("taskList") != undefined) {
  tasks = store.get("taskList");
  for (let i = 0; i < tasks.length; i++) {
    totalHrs += parseInt(tasks[i].length);
    numTasks++;
  }
}

var currentDay = currentDate.getDay();
var dayName = days[currentDay];
document.getElementById("day").innerHTML = dayName;

var modal = document.getElementById("add-task-modal");
var addTaskButton = document.getElementById("add-task-button");
var xButton = document.getElementById("cancel-button");
var cancelTaskButton = document.getElementById("cancel-task-button");

var addTaskFormButton = document.getElementById("add-task-form-button");

addTaskButton.onclick = function () {
  modal.style.display = "flex";
};

xButton.onclick = function () {
  modal.style.display = "none";
  clearForm();
};

cancelTaskButton.onclick = function () {
  modal.style.display = "none";
  clearForm();
};

function clearForm() {
  document.getElementsByClassName("input")[0].value = "";
  document.getElementsByClassName("input")[1].value = "";
  document.getElementsByClassName("input")[2].value = "";
  document.getElementById("form-priority").value = "Normal";
  document.getElementById("form-description").value = "";
}

addTaskFormButton.onclick = function () {
  form = document.getElementsByClassName("input");
  // console.log(form[0].value);
  var addName = form[0].value;
  var addDate = form[1].value;
  var addLength = form[2].value;
  var addPriority = document.getElementById("form-priority").value;
  var addDescription = document.getElementById("form-description").value;

  var newTask = new Task(addName, addDate, addLength, addPriority);

  tasks.push(newTask);

  store.set("taskList", tasks);

  console.log(store.get("taskList"));

  // store.clear("tasklist");

  modal.style.display = "none";
  clearForm();
  displayTodo();

  /* console.log(addName);
  console.log(addDate);
  console.log(addLength);
  console.log(addPriority);
  console.log(addDescription); */
};

// Display daily to-do list:
function displayTodo() {
  tasks = store.get("taskList");

  if (numTasks != tasks.length) {
    totalHrs += parseInt(tasks[tasks.length - 1].length);
    numTasks++;
  }

  if (numTasks > 0) {
    average = totalHrs / numTasks;
  }

  console.log(tasks.length);

  let taskText = "";

  for (let i = 0; i < tasks.length; i++) {
    // Use object destructuring here :)
    taskText +=
      tasks[i].name +
      " - By: " +
      tasks[i].date +
      "<br />" +
      " Due in " +
      getDayDifference(currentDate, new Date(tasks[i].date)) +
      " days.<br /> You should spend approx. " +
      tasks[i].length +
      " hours working on this task.";

    taskText += "<hr />";
  }

  document.getElementById("day-task").innerHTML = taskText;
}

function getDayDifference(date1, date2) {
  return Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
}

displayTodo();
