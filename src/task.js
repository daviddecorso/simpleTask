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

const firstTimeCheck = new Store({ firstTime });
const store = new Store({ taskList });
var tasks = new Array();

if (firstTimeCheck.get("firstTime") == undefined) {
  firstTimeCheck.set("firstTime", true);
  store.set("taskList", tasks);
  console.log("First time setup!");
}

if (store.get("taskList") != undefined) {
  tasks = store.get("taskList");
}

var test = store.get("taskList");

var day = currentDate.getDay();
var dayName = days[day];
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

  store.clear("tasklist");

  modal.style.display = "none";
  clearForm();

  /* console.log(addName);
  console.log(addDate);
  console.log(addLength);
  console.log(addPriority);
  console.log(addDescription); */
};
