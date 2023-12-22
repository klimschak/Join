
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
                  <div  id="overview-category">${task.category}</div>
                  <div class="overview-title">${task.title}</div>
                  <div class="overview-description">${task.description}</div>
                  <div class="overview-date"><div>Due Date:</div><div>${task.date}</div></div>
                  <div class="overview-priority"><div>Priority:</div><div>${task.priority}</div></div>
                  <div id="overview-assigned" class="overview-assigned">
                        <div class="overview-assigned-label">Assigned to:</div>
                        <div id="overview-assigned-label-badge-container" class="overview-assigned-label-badge-container"></div>
                  </div>
                  <div id="overview-subtasks-container" class="overview-subtasks-container">
                        <div class="overview-subtasks-label">Subtasks:</div>
                        <div id="overview-subtasks" class="overview-subtasks"></div>
                  </div>
            </div>
      
      `


}

async function loadOverviewAssigned(task){
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


async function loadSubtasksinOverview(){
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

async function changeSubtaskStateinOverview(subtaskID){
      task.subtasks[subtaskID].completed = !task.subtasks[subtaskID].completed;
      await saveTaskToRemoteStorage();
      await loadSubtasksinOverview(task)
}
