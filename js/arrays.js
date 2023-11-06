let accounts = [
  {
    id: 1,
    name: "Siham El-Maimouni",
    initials: "SE",
  },

  {
    id: 2,
    name: "Pedro Göntürk",
    initials: "PG",
  },

  {
    id: 3,
    name: "Thorsten Puccini",
    initials: "TP",
  },
];

let tasks = [
  {
    assigned: ["Pedro Göntürk", "Thorsten Puccini"],
    category: ["User Story"],
    date: [],
    description: ["Lorem ipsum dolor sit amet, consetetur sadipscing elitr"],
    id: [],
    initials: ["PG", "TP"],
    priority: ["Urgent"],
    status: ["to-do"],
    subtasks: {
      subtask: ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"],
      subtask_id: [0, 1, 2, 3, 4],
      completed: [false, true, true, false, false],
    },
    title: ["This is a Task Title"],
    
  },

  {
    assigned: ["Pedro Göntürk", "Thorsten Puccini"],
    category: ["User Story"],
    date: [],
    description: ["Lorem ipsum dolor sit amet, consetetur sadipscing elitr"],
    id: [],
    initials: ["PG", "TP"],
    priority: ["Medium"],
    status: ["done"],
    subtasks: {
      subtask: ["Task 1", "Task 2", "Task 3", "Task 4"],
      subtask_id: [0, 1, 2, 3, 4],
      completed: [false, true, true, true],
    },
    title: ["This is another Task"],
   
      },
];
