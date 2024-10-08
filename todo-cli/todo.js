const taskManager = () => {
  const tasks = [];

  const addTask = (task) => {
    tasks.push(task);
  };

  const markCompleted = (index) => {
    if (tasks[index]) tasks[index].completed = true;
  };

  const overdueTasks = () => {
    return tasks.filter((task) => !task.completed && task.dueDate < currentDay);
  };

  const tasksDueToday = () => {
    return tasks.filter((task) => task.dueDate === currentDay);
  };

  const tasksDueLater = () => {
    return tasks.filter((task) => !task.completed && task.dueDate > currentDay);
  };

  const formatTaskList = (taskList) => {
    return taskList
      .map(
        (task) =>
          `${task.completed ? "[x]" : "[ ]"} ${task.title} ${
            task.dueDate === currentDay ? "" : task.dueDate
          }`
      )
      .join("\n");
  };

  return {
    addTask,
    markCompleted,
    overdueTasks,
    tasksDueToday,
    tasksDueLater,
    formatTaskList,
  };
};
const todoManager = taskManager();

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

const todayDate = new Date();
const currentDay = formatDate(todayDate);
const previousDay = formatDate(
  new Date(todayDate.setDate(todayDate.getDate() - 1))
);
const nextDay = formatDate(
  new Date(todayDate.setDate(todayDate.getDate() + 2))
);

todoManager.addTask({
  title: "Submit assignment",
  dueDate: previousDay,
  completed: false,
});
todoManager.addTask({
  title: "Pay rent",
  dueDate: currentDay,
  completed: true,
});
todoManager.addTask({
  title: "Service Vehicle",
  dueDate: currentDay,
  completed: false,
});
todoManager.addTask({
  title: "File taxes",
  dueDate: nextDay,
  completed: false,
});
todoManager.addTask({
  title: "Pay electric bill",
  dueDate: nextDay,
  completed: false,
});

console.log("My Task List\n");

console.log("Overdue Tasks");
let overdueList = todoManager.overdueTasks();
console.log(todoManager.formatTaskList(overdueList));

console.log("\nDue Today");
let todayList = todoManager.tasksDueToday();
console.log(todoManager.formatTaskList(todayList));

console.log("\nDue Later");
let laterList = todoManager.tasksDueLater();
console.log(todoManager.formatTaskList(laterList));
console.log("\n\n");
