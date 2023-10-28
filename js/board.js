function renderTasksOnKanban(){
  let ToDo = document.getElementById('to-do-column');
  let category = tasks[0].category
  let category_display = category
  if (category == "user-story"){
    category_display = "User Story"
  }
  let title = tasks[0].title;
  let description = tasks[0].description


  let subtasks = getLengthOfSubtasks();
  let completed = getCompletedTasks();

  

  ToDo.innerHTML = "";
  ToDo.innerHTML = /*html*/`
        <div id="kanban-card" class="kanban-card">

          <div class="kanban-category-${category}">
            ${category_display}
          </div>

          <div class="kanban-title">
            ${title}
          </div>

          <div class="kanban-description">
            ${description}
          </div>

          <div class="kanban-subtask">
            <div class="kanban-subtask-progress-container">
              <div class="kanban-subtask-progress-bar" id="kanban-subtask-progress-bar">
            
            </div>
            </div>

            <div class="kanban-subtask-completed">${completed}/${subtasks} Subtasks</div>
          </div>

          <div class="kanban-badge-prio-container">
            <div class="kanban-assign-prio-container">
              <div class="kanban-assign-badge-container" id="kanban-assign-to"></div>
              <div class="kanban-prio"></div>
            </div>

            <div class="kanban-prio" id="kanban-prio"></div>

          </div>
        </div>
  `
  let progressBar = document.getElementById(`kanban-subtask-progress-bar`);
  progressBar.style.width = `${100 / subtasks * completed}%`;
  getAssignedToInitials();
  getPrioToKanban();
  
}

//Rendern der Initialien
function getAssignedToInitials(){
  let initials = tasks[0].initials;
  let assignedTo = document.getElementById('kanban-assign-to');
  assignedTo.innerHTML = ``;
  for (let i = 0; i < initials.length; i++) {
    const initial = initials[i];
    assignedTo.innerHTML += /*html*/`
    <div class="kanban-assign-badge">${initial}</div> 
    `
    
  }
}

function getPrioToKanban(){
  let container = document.getElementById(`kanban-prio`);
  let prio = tasks[0].priority;

  if (prio == "Urgent") {
    container.innerHTML =  `<img src="./assets/img/Prio_alta.svg" alt="">`
  }
}

//Anzahl der Subtasks zurückgeben
function getLengthOfSubtasks(){
  let task = tasks[0].subtasks.subtask
  let numberOfTasks = task.length;
  
  return numberOfTasks;
  
}
 //Anzahl der abgeschlossenen Subtasks zurückgeben
function getCompletedTasks(){
  let completedArray = tasks[0].subtasks.completed;
  let numberOfTrueValues = completedArray.filter(entity => entity === true).length;
  return numberOfTrueValues
}