const { v4: uuidv4 } = require("uuid");
const prompt = require("prompt-sync")();
const fs = require("fs");
const tasks = [];

function saveTasks() {
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
  console.log("Tasks saved successfully.");
}
function loadTasks() {
  try {
    const data = fs.readFileSync("tasks.json");
    tasks = JSON.parse(data);
    console.log("Tasks loaded successfully.");
  } catch (err) {
    console.error("Error loading tasks:", err);
  }
}

function displayTasks(tasks) {
  tasks?.forEach((task, index) => {
    console.log(`${index + 1}. ${task.taskName}`);
  });
}

function addTask(tasks) {
  let taskName = prompt("Enter Your Task: ");
  tasks.push({ id: uuidv4(), taskName: taskName, isCompleted: false });
}

function udpateTask(tasks, indexToBeUpdated) {
  let updatedTask = "";
  console.log(`Task to be updated====== ${tasks[indexToBeUpdated].taskName}`);
  updatedTask = prompt(`Enter your new task:   `);

  tasks[indexToBeUpdated].taskName = updatedTask;
}
function listTask() {
  console.log("******Active Tasks  Below******");
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  displayTasks(activeTasks);

  const completedTasks = tasks.filter((task) => task.isCompleted);
  console.log("******Completed Tasks  Below******");
  displayTasks(completedTasks);

  console.log("******The above was Your tasks******");
  console.log("");
}

function deleteTask(tasks, indexToBeDeleted) {
  tasks.forEach((element, index) => {
    if (index == indexToBeDeleted) {
      tasks.splice(indexToBeDeleted, 1);
    }
  });
  tasks.filter((element) => element);
}

function main() {
  displayTasks(tasks);
  let command = prompt(
    "Enter command (add, delete, update, list, exit / quit): "
  );
  command = command.trim().toString();
  switch (command) {
    case "add":
      addTask(tasks);
      saveTasks();
      main();
      break;
    case "delete":
      let indexToBeDeleted =
        parseInt(prompt("Enter the index of task to be delete:  ")) - 1;
      deleteTask(tasks, indexToBeDeleted);
      saveTasks();
      main();
      break;
    case "update":
      let indexToBeUpdated =
        parseInt(prompt("Enter the index of task to be update:  ")) - 1;
      udpateTask(tasks, indexToBeUpdated);
      saveTasks();
      main();
      break;
    case "list":
      listTask();
      setTimeout(main, 5000);
      break;
    case "quit":
      console.log("You have quitted this application");
      return;
      break;

    default:
      console.log("Invalid Input");
      main();
      break;
  }
}

main();
