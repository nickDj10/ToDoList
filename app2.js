var button = document.getElementById("button-add-task");
var buttonStart = document.getElementById("task-date-start");
var buttonEnd = document.getElementById("task-date-end");
var task = document.getElementById("task-id");

button.addEventListener("click", addTaskToList);

var toDoArray = localStorage.getItem("toDo")
  ? JSON.parse(localStorage.getItem("toDo"))
  : [];

function addTaskToList() {
  var taskValue = task.value;
  var buttonStartValue = buttonStart.value;
  var buttonEndValue = buttonEnd.value;
  var id = Math.random();

  var taskObj = {
    task: taskValue,
    start: buttonStartValue,
    end: buttonEndValue,
    id: id,
  };

  if (taskValue == "" || buttonEndValue == "" || buttonStartValue == "") {
    return window.alert("Please enter your task!");
  }

  toDoArray.push(taskObj);
  localStorage.setItem("toDo", JSON.stringify(toDoArray));
  createListElement(taskValue, buttonStartValue, buttonEndValue, id);

  buttonStart.value = "";
  buttonEnd.value = "";
  task.value = "";
}

function createListElement(task, timeStart, timeEnd, num) {
  var ul = document.getElementById("list-ul");

  var li = document.createElement("li");
  li.innerHTML = `<div class="li-text"> ${task} </div> <div class="li-time">
  <span>${timeStart} - ${timeEnd}</span>  </div> <span class='btn'><button class='btn-style' onClick="deleteItem(${num})">remove</button></span>`;
  li.className = "list-li";

  ul.appendChild(li);
  console.log(localStorage);
}

function deleteItem(num) {
  let items = toDoArray;
  let index = items.findIndex((element) => element.id === num);
  if (index > -1) {
    items.splice(index, 1);
  }
  localStorage.setItem("toDo", JSON.stringify(items));
  console.log(localStorage);
  location.reload();
}

//Za prikazivanje rezultata nakon refrash-a stranice:
function updateTask() {
  for (var i = 0; i < toDoArray.length; i++) {
    createListElement(
      toDoArray[i].task,
      toDoArray[i].start,
      toDoArray[i].end,
      toDoArray[i].id
    );
  }
}
updateTask();

//Za unos podataka na 'enter'
function addTaskOnEnter(event) {
  if (event.keyCode == 13) {
    //Kada pritisnemo eneter samo tada se javlja 'keycode=13'
    addTaskToList(event);
  }
}

task.addEventListener("keypress", addTaskOnEnter);
buttonStart.addEventListener("keypress", addTaskOnEnter);
buttonEnd.addEventListener("keypress", addTaskOnEnter);
