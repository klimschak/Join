async function initBoard(){
  await copyUsersToAccounts()
  await initRenderAllTasksOnKanban()
}



async function initRenderAllTasksOnKanban() {
  
  await loadTaskFromRemoteStorageToBoard();
  resetBoard();
  for (let i = 0; i < tasks.length; i++) {
    await renderTaskCardOnKanban(i);
  }
  await checkIfTaskColumnIsEmpty()


}

async function loadTaskFromRemoteStorageToBoard() {
  tasks = JSON.parse(await getItem('tasks'));
}

async function saveTaskToRemoteStorageFromBoard() {
  await setItem('tasks', (JSON.stringify(tasks)))

}

async function renderAllTasksOnKanban() {
  for (let i = 0; i < tasks.length; i++) {
    renderTaskCardOnKanban(i);
  }
  await checkIfTaskColumnIsEmpty()
}

async function loadTaskFromRemoteStorage() {
  tasks = JSON.parse(await getItem('tasks'));
}

function resetBoard() {
  document.getElementById("to-do-column").innerHTML = "";
  document.getElementById("in-progress-column").innerHTML = "";
  document.getElementById("await-feedback-column").innerHTML = "";
  document.getElementById("done-column").innerHTML = "";
}

async function checkIfTaskColumnIsEmpty() {
  let todoColumn = document.getElementById("to-do-column");
  let progressColumn = document.getElementById("in-progress-column");
  let feedbackColumn = document.getElementById("await-feedback-column");
  let doneColumn = document.getElementById("done-column");

  if (!todoColumn.innerHTML.trim()) {
    todoColumn.innerHTML = `<div class="notasks">No To-Do Tasks</div>`;
  }
  if (!progressColumn.innerHTML.trim()) {
    progressColumn.innerHTML = `<div class="notasks">No Progress Tasks</div>`;
  }
  if (!feedbackColumn.innerHTML.trim()) {
    feedbackColumn.innerHTML = `<div class="notasks">No Await Tasks</div>`;
  }
  if (!doneColumn.innerHTML.trim()) {
    doneColumn.innerHTML = `<div class="notasks">No Done Tasks</div>`;
  }
}


async function renderTaskCardOnKanban(i) {
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
  status.innerHTML += await htmlTemplateRenderTaskCardOnKanban(
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



function getTaskStatus(i) {
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
  let task = tasks[i].subtasks;
  let numberOfTasks = task.length;
  return numberOfTasks;
}

function getCompletedTasks(i) {
  let subtasks = tasks[i].subtasks;
  let completed = 0;
  for (let j = 0; j < subtasks.length; j++) {
    if (subtasks[j].completed === true) {
      completed++;
    }
  }
  return completed;
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
  let colorId = tasks[i].id;
  let assignedTo = document.getElementById(`kanban-assign-to-${i}`);
  assignedTo.innerHTML = ``;
  for (let j = 0; j < initials.length; j++) {
    const initial = initials[j];
    const color = colorId[j];
    const accountWithColorId = accounts.find(account => account.id === color);
    const colorValue = accountWithColorId ? accountWithColorId.color : 'Nicht gefunden';
    assignedTo.innerHTML += /*html*/ `
    <div class="kanban-assign-badge" style="background-color: ${colorValue};">${initial}</div> 
    `;
  }
}

async function htmlTemplateRenderTaskCardOnKanban(
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
  <div draggable="true" ondragend="resetCard(${i})" ondragstart="startDragging(${i}), tiltCard(${i})" id="kanban-card-${i}" class="kanban-card pointer" onclick="loadTaskOverview(${i})">
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
        <div class="kanban-assign-badge-container" id="kanban-assign-to-${i}" ></div>
        <div class="kanban-prio"></div>
      </div>
      <div class="kanban-prio">${prio}</div>
    </div>
  </div>
  `;

}

function tiltCard(i) {
  let card = document.getElementById(`kanban-card-${i}`)
  card.classList.add('tilt');

}

function resetCard(i) {
  let card = document.getElementById(`kanban-card-${i}`)
  card.classList.remove('tilt');
}

let currentDraggedElement;

function allowDrop(event) {
  event.preventDefault();
}

function startDragging(i) {
  currentDraggedElement = i;
}

async function dropIntoColumn(ev, columnId) {
  ev.preventDefault();
  const i = currentDraggedElement;
  const kanbanCard = document.getElementById(`kanban-card-${i}`);
  const targetColumn = document.getElementById(columnId);

  if (kanbanCard && targetColumn) {
    // Hier wird der gesamte Container verschoben
    deleteNoTasksStatus(columnId);
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
function filterTasks() {
  let search = document.getElementById('search-input').value;
  search = search.toLowerCase();
  console.log(search);
  for (let j = 0; j < tasks.length; j++) {
    let kanbanCard = document.getElementById(`kanban-card-${j}`);
    let taskTitle = tasks[j].title.toString();
    let taskDescription = tasks[j].description.toString();
    if (taskTitle.toLowerCase().includes(search) || taskDescription.toLowerCase().includes(search)) {
      kanbanCard.classList.remove('d-none')
    }
    else {
      kanbanCard.classList.add('d-none');
    }
  }
}


function deleteNoTasksStatus(columnId) {
  const targetColumn = document.getElementById(columnId);
  const elementsToRemove = targetColumn.querySelectorAll('.notasks');
  elementsToRemove.forEach(function (element) {
    element.remove();
  });

}




let autoScrollInterval;
const scrollContainer = document.getElementById('to-do-column');


document.getElementById('to-do-column').addEventListener('wheel', function (e) {
  // Basierend auf der Erkennung der horizontalen Bewegung entscheiden
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    // Wenn eine signifikante horizontale Bewegung vorhanden ist, lassen Sie das normale Scrollen zu
    // Dies ist besonders wichtig für Trackpads
    e.stopPropagation(); // Verhindert, dass das Ereignis weiter nach oben im DOM propagiert wird
  } else {
    // Verhindert das Standardverhalten (Vertikales Scrollen) und erlaubt stattdessen horizontales Scrollen
    e.preventDefault();
    this.scrollLeft += e.deltaY + e.deltaX; // Nutzt sowohl vertikale als auch horizontale Bewegungen für das Scrollen
  }
}, { passive: false }); // `{passive: false}` ist notwendig, um `preventDefault` in modernen Browsern zu erlauben


document.querySelectorAll('.draggable').forEach(item => {
  item.addEventListener('dragstart', handleDragStart, false);
  item.addEventListener('dragend', handleDragEnd, false);
});

scrollContainer.addEventListener('dragover', handleDragOver, false);

function handleDragStart(e) {
  this.style.opacity = '0.4';  // Optional: Elementtransparenz während des Drag-Vorgangs
}

function handleDragOver(e) {
  e.preventDefault(); // Erlaubt das Droppen von Elementen
  const scrollSpeed = 5;
  const edgeMargin = 50; // Pixel vom Rand, bei denen das Scrollen beginnen soll
  const containerRect = scrollContainer.getBoundingClientRect();
  const containerLeftEdge = containerRect.left;
  const containerRightEdge = containerRect.right;

  // Startet das Scrollen, wenn sich die Maus am linken oder rechten Rand befindet
  if (e.clientX - containerLeftEdge < edgeMargin) {
    startAutoScroll(-scrollSpeed);
  } else if (containerRightEdge - e.clientX < edgeMargin) {
    startAutoScroll(scrollSpeed);
  } else {
    stopAutoScroll();
  }
}

function handleDragEnd(e) {
  this.style.opacity = '1'; // Stellt die Transparenz des Elements wieder her
  stopAutoScroll();
}

function startAutoScroll(speed) {
  stopAutoScroll(); // Stellt sicher, dass kein Intervall läuft
  autoScrollInterval = setInterval(() => {
    scrollContainer.scrollLeft += speed;
  }, 20); // Passt die Geschwindigkeit und das Intervall des Scrollens an
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}


document.getElementById('to-do-column').addEventListener('wheel', function (e) {
  // Basierend auf der Erkennung der horizontalen Bewegung entscheiden
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    // Wenn eine signifikante horizontale Bewegung vorhanden ist, lassen Sie das normale Scrollen zu
    // Dies ist besonders wichtig für Trackpads
    e.stopPropagation(); // Verhindert, dass das Ereignis weiter nach oben im DOM propagiert wird
  } else {
    // Verhindert das Standardverhalten (Vertikales Scrollen) und erlaubt stattdessen horizontales Scrollen
    e.preventDefault();
    this.scrollLeft += e.deltaY + e.deltaX; // Nutzt sowohl vertikale als auch horizontale Bewegungen für das Scrollen
  }
}, { passive: false }); // `{passive: false}` ist notwendig, um `preventDefault` in modernen Browsern zu erlauben
