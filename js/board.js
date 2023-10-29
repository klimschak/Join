function renderAllTasksOnKanban(){
  let ToDo = document.getElementById('to-do-column');
  ToDo.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    renderTaskCardOnKanban(i);
  }
}

function renderTaskCardOnKanban(i){
  let ToDo = document.getElementById('to-do-column');
  let category = getKanbanTaskCategory(i);
  let categoryclass = getKanbanTaskCategoryCSSClass(i);
  let title = getKanbanTaskTitle(i);
  let description = getKanbanTaskDescription(i);
  let subtasks = getLengthOfSubtasks(i);
  let subtaskprogress = getKanbanSubtaskBar(i);
  let subtaskscompleted = getCompletedTasks(i);
  let prio = getPrioForKanban(i);
  ToDo.innerHTML += htmlTemplateRenderTaskCardOnKanban(i, title, description, category, categoryclass, subtasks, subtaskscompleted, subtaskprogress, prio);
  getAssignBadgesInitials(i)
}

function getKanbanTaskCategory(i) {
  let category = tasks[i].category;
  return category
}

function getKanbanTaskCategoryCSSClass(i){
  let category = tasks[i].category;
  let categoryclass;
  if (category == "User Story"){
    categoryclass = "user-story"
  }
  if (category == "Technical Task"){
    categoryclass = "technical-task"
  }
  return categoryclass
}

function getKanbanTaskTitle(i){ 
  let title = tasks[i].title;
  return title
}

function getKanbanTaskDescription(i){
  let description = tasks[i].description;
  return description
}

//Anzahl der Subtasks zurückgeben
function getLengthOfSubtasks(i){
  let task = tasks[i].subtasks.subtask;
  let numberOfTasks = task.length;
  return numberOfTasks
}

//Anzahl der abgeschlossenen Subtasks zurückgeben
function getCompletedTasks(i){
  let completedArray = tasks[i].subtasks.completed;
  let numberOfTrueValues = completedArray.filter(entity => entity === true).length;
  return numberOfTrueValues
}

function getKanbanSubtaskBar(i){
  let subtasks = getLengthOfSubtasks(i);
  let completed = getCompletedTasks(i);
  let subtaskProgress = `${100 / subtasks * completed}%`;
  return subtaskProgress
}

function getPrioForKanban(i){
  let prio = tasks[i].priority;
  let prioIcon;
  if (prio == "Urgent") {
    prioIcon =  `<img src="./assets/img/Prio_alta.svg" alt="">`
  }
  if (prio == "Medium") {
    prioIcon =  `<img src="./assets/img/Prio_media.svg" alt="">`
  }
  if (prio == "Low") {
    prioIcon =  `<img src="./assets/img/Prio_baja.svg" alt="">`
  }
  return prioIcon
}

//Rendern der Initialien
function getAssignBadgesInitials(i){
  let initials = tasks[i].initials;
  let assignedTo = document.getElementById(`kanban-assign-to-${i}`);
  assignedTo.innerHTML = ``;
  for (let j = 0; j < initials.length; j++) {
    const initial = initials[j];
    assignedTo.innerHTML += /*html*/`
    <div class="kanban-assign-badge">${initial}</div> 
    `
  }
}

function htmlTemplateRenderTaskCardOnKanban (i, title, description, category, categoryclass, subtasks, subtaskscompleted, subtaskprogress,prio){
  return /*html*/`
  <div id="kanban-card-${i}" class="kanban-card">
 
    <div class="kanban-category-${categoryclass}">
      ${category}
    </div>
 
    <div class="kanban-title">
    ${title}
    </div>
 
    <div class="kanban-description">
      ${description}      
    </div>
 
    <div class="kanban-subtask">
      <div class="kanban-subtask-progress-container">
        <div class="kanban-subtask-progress-bar" style="width: ${subtaskprogress}">
      
      </div>
      </div>
 
      <div class="kanban-subtask-counter">${subtaskscompleted}/${subtasks} Subtasks</div>
    </div>
 
    <div class="kanban-badge-prio-container">
      <div class="kanban-assign-prio-container">
        <div class="kanban-assign-badge-container" id="kanban-assign-to-${i}"></div>
        <div class="kanban-prio"></div>
      </div>
 
      <div class="kanban-prio">${prio}</div>
 
    </div>
  </div>
 `
 }