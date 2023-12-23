
let task;
async function loadTaskOverview(taskID) {
      let overlay = document.getElementById('task-overview-overlay');
      task = tasks[taskID];
      overlay.classList.remove('d-none')

      console.log(
            `
      TaskID: ${task.taskID}
      Kategorie: ${task.category}
      Title: ${task.title}
      Description: ${task.description}
      Priority: ${task.priority}
      Assigned: ${task.assigned}
      `

      );
      overlay.innerHTML += await htmlTemplateLoadTaskOverview(task);
      await loadOverviewAssigned(task)
      await loadSubtasksinOverview(task)
}



async function htmlTemplateLoadTaskOverview(task) {

      return /*html*/`
            <div id="overview-container" class="overview-container">
                  <div class="overview-category-close">
                        <div id="overview-category">${task.category}</div>
                        <div class="close-icon"><img  onclick="closeTaskOverview()" src="./assets/img/Close.svg" alt=""></div>
                  </div>
                  <div class="overview-title">${task.title}</div>
                  <div class="overview-description">${task.description}</div>
                  <div class="overview-date"><div>Due Date:</div><div>${task.date}</div></div>
                  <div class="overview-priority"><div>Priority:</div><div>
                        <img class="overview-priority-image" src="./assets/img/${task.priority}.svg" alt=""><span class="overview-priority-label">${task.priority}</span></div></div>
                  <div id="overview-assigned" class="overview-assigned">
                        <div class="overview-assigned-label">Assigned to:</div>
                        <div id="overview-assigned-label-badge-container" class="overview-assigned-label-badge-container"></div>
                  </div>
                  <div id="overview-subtasks-container" class="overview-subtasks-container">
                        <div class="overview-subtasks-label">Subtasks:</div>
                        <div id="overview-subtasks" class="overview-subtasks"></div>
                  </div>
                  <div class="overview-button-container">
                        <div>
                              <div class="btn-tertiary">
                                    <svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_81758_217" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                    <rect width="24" height="24"></rect>
                                    </mask>
                                    <g mask="url(#mask0_81758_217)">
                                    <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"></path>
                                    </g>
                                    </svg>
                                    <span>Delete</span>
                              </div>
                              <hr>
                              <div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <mask id="mask0_81758_502" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                          <rect width="24" height="24"></rect>
                                          </mask>
                                          <g mask="url(#mask0_81758_502)">
                                          <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"></path>
                                          </g>
                                    </svg>
                                    <span>Edit</span>
                              </div>
                        </div>
                  </div>

            </div>
      
      `


}

async function loadOverviewAssigned(task) {
      let div = document.getElementById('overview-assigned-label-badge-container');
      assigned = task.assigned;
      for (let i = 0; i < assigned.length; i++) {
            const initials = task.initials[i];
            const name = task.assigned[i];
            div.innerHTML += /*html*/`
            <div class="overview-assign-badge-container"><div class="overview-assign-badge">${initials}</div> <div>${name}</div></div>
            `
      }
}


async function loadSubtasksinOverview() {
      let div = document.getElementById('overview-subtasks');
      let subtasks = task.subtasks;
      div.innerHTML = "";
      for (let i = 0; i < subtasks.length; i++) {
            const subtask = task.subtasks[i].subtask;
            const state = task.subtasks[i].completed;

            if (state === false) {
                  div.innerHTML += /*html*/`
                  <div class="overview-subtask-item" id="overview-subtask-item${i}" onclick="changeSubtaskStateinOverview(${i})"><img src="./assets/img/tick-box-false.svg" alt="">${subtask}</div>
                  `
            }
            if (state === true) {
                  div.innerHTML += /*html*/`
                  <div class="overview-subtask-item" id="overview-subtask-item${i}" onclick="changeSubtaskStateinOverview(${i})"><img src="./assets/img/tick-box-true.svg" alt="">${subtask}</div>
                  `
            }

      }
}

async function changeSubtaskStateinOverview(subtaskID) {
      task.subtasks[subtaskID].completed = !task.subtasks[subtaskID].completed;
      await saveTaskToRemoteStorage();
      await loadSubtasksinOverview(task)
}


async function closeTaskOverview() {
      let overlay = document.getElementById('task-overview-overlay');
      overlay.classList.add('d-none');
      overlay.innerHTML = "";
      await initRenderAllTasksOnKanban()
}



