


async function initRenderAllTasksOnKanban() {
  
  await loadTaskFromRemoteStorageToBoard();
  resetBoard();
  for (let i = 0; i < tasks.length; i++) {
    renderTaskCardOnKanban(i);
  }
}

async function loadTaskFromRemoteStorageToBoard(){
  tasks = JSON.parse(await getItem('tasks'));
}

async function saveTaskToRemoteStorageFromBoard(){
  await setItem('tasks', (JSON.stringify(tasks)))
  
}

function renderAllTasksOnKanban() {
   for (let i = 0; i < tasks.length; i++) {
    renderTaskCardOnKanban(i);
  }
}

async function loadTaskFromRemoteStorage(){
  tasks = JSON.parse(await getItem('tasks'));
}

function resetBoard(){
  document.getElementById("to-do-column").innerHTML = "";
  document.getElementById("in-progress-column").innerHTML = "";
  document.getElementById("await-feedback-column").innerHTML = "";
  document.getElementById("done-column").innerHTML = "";
}

function renderTaskCardOnKanban(i) {
  let status = getTaskStatus(i);
  status = document.getElementById(`${status}`);
  let category = getKanbanTaskCategory(i);
  let categoryclass = getKanbanTaskCategoryCSSClass(i);
  let title = getKanbanTaskTitle(i);
  let description = getKanbanTaskDescription(i);
  let subtasks = getLengthOfSubtasks(i);
  let subtaskprogress = getKanbanSubtaskBar(i);
  let subtaskscompleted = getCompletedTasks(i);
  let prio = getPrioForKanban(i);
  status.innerHTML += htmlTemplateRenderTaskCardOnKanban(
    i,
    title,
    description,
    category,
    categoryclass,
    subtasks,
    subtaskscompleted,
    subtaskprogress,
    prio
  );
  getAssignBadgesInitials(i);
}

function getTaskStatus(i){
  let taskStatus = tasks[i].status;
  return taskStatus

}

function getKanbanTaskCategory(i) {
  let category = tasks[i].category;
  return category;
}

function getKanbanTaskCategoryCSSClass(i) {
  let category = tasks[i].category;
  let categoryclass;
  if (category == "User Story") {
    categoryclass = "user-story";
  }
  if (category == "Technical Task") {
    categoryclass = "technical-task";
  }
  return categoryclass;
}

function getKanbanTaskTitle(i) {
  let title = tasks[i].title;
  return title;
}

function getKanbanTaskDescription(i) {
  let description = tasks[i].description;
  return description;
}

function getLengthOfSubtasks(i) {
  let task = tasks[i].subtasks.subtask;
  let numberOfTasks = task.length;
  return numberOfTasks;
}

function getCompletedTasks(i) {
  let completedArray = tasks[i].subtasks.completed;
  let numberOfTrueValues = completedArray.filter(
    (entity) => entity === true
  ).length;
  return numberOfTrueValues;
}

function getKanbanSubtaskBar(i) {
  let subtasks = getLengthOfSubtasks(i);
  let completed = getCompletedTasks(i);
  let subtaskProgress = `${(100 / subtasks) * completed}%`;
  return subtaskProgress;
}

function getPrioForKanban(i) {
  let prio = tasks[i].priority;
  let prioIcon;
  if (prio == "Urgent") {
    prioIcon = `<img src="./assets/img/Prio_alta.svg" alt="">`;
  }
  if (prio == "Medium") {
    prioIcon = `<img src="./assets/img/Prio_media.svg" alt="">`;
  }
  if (prio == "Low") {
    prioIcon = `<img src="./assets/img/Prio_baja.svg" alt="">`;
  }
  return prioIcon;
}

function getAssignBadgesInitials(i) {
  let initials = tasks[i].initials;
  let assignedTo = document.getElementById(`kanban-assign-to-${i}`);
  assignedTo.innerHTML = ``;
  for (let j = 0; j < initials.length; j++) {
    const initial = initials[j];
    assignedTo.innerHTML += /*html*/ `
    <div class="kanban-assign-badge">${initial}</div> 
    `;
  }
}

function htmlTemplateRenderTaskCardOnKanban(
  i,
  title,
  description,
  category,
  categoryclass,
  subtasks,
  subtaskscompleted,
  subtaskprogress,
  prio
) {
  return /*html*/ `
  <div draggable="true" ondragstart="startDragging(${i})" id="kanban-card-${i}" class="kanban-card">
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
  `;
}

let currentDraggedElement;

function allowDrop(event) {
  event.preventDefault();
}

function startDragging(i) {
  currentDraggedElement = i;
}

function dropIntoColumn(ev, columnId) {
  ev.preventDefault();
  const i = currentDraggedElement;
  const kanbanCard = document.getElementById(`kanban-card-${i}`);
  const targetColumn = document.getElementById(columnId);

  if (kanbanCard && targetColumn) {
    // Hier wird der gesamte Container verschoben
    kanbanCard.remove(); // Entferne das Element aus dem ursprünglichen Container
    targetColumn.appendChild(kanbanCard); // Füge es dem Zielcontainer hinzu
    moveTo(columnId);
  }
}

async function moveTo(status) {
  tasks[currentDraggedElement].status = status; // Ändere "status" zu "category", falls es die richtige Eigenschaft ist.
  await saveTaskToRemoteStorageFromBoard();
  await initRenderAllTasksOnKanban();
}



//Filterfunktion
function filterTasks(){
  let search = document.getElementById('search-input').value;
  search = search.toLowerCase();
  console.log(search);
  for (let j = 0; j < tasks.length; j++) {
    let kanbanCard = document.getElementById(`kanban-card-${j}`);
    let taskTitle = tasks[j].title.toString();
    let taskDescription = tasks[j].description.toString();
    if (taskTitle.toLowerCase().includes(search) || taskDescription.toLowerCase().includes(search)){
      kanbanCard.classList.remove('d-none')
    }
    else {
    kanbanCard.classList.add('d-none');
  }}
}

async function openAddTaskOverlay() {
      
  let overlay = document.getElementById('add-task-overlay');
  overlay.innerHTML = /*html*/`
  <div id="add-task-overlay-background">
    <div id="add-task-overlay-container" w3-include-html="add-task.html">
    </div>
  </div>`;
  await includeHTML();


}
