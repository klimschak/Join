async function loadTaskOverview(taskID) {
      let overlay = document.getElementById('task-overview-overlay');
      let task = tasks[taskID];
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
}

async function htmlTemplateLoadTaskOverview(task) {

      return /*html*/`
            <div id="overview-container" class="overview-container">
                  <div  id="overview-category">${task.category}</div>
                  <div class="overview-title">${task.title}</div>
                  <div class="overview-description">${task.description}</div>
                  <div class="overview-date"><div>Due Date:</div><div>${task.date}</div></div>
                  <div class="overview-priority"><div>Priority:</div><div>${task.priority}</div></div>
                  <div id="overview-assigned" class="overview-assigned" onload=""><div>Assigned to:</div></div>
            </div>
      
      `


}

async function loadOverviewAssigned(task){
      let div = document.getElementById('overview-assigned');
      assigned = task.assigned;
      for (let i = 0; i < assigned.length; i++) {
            const initials = task.initials[i];
            const name = task.assigned[i];
            div.innerHTML += /*html*/`
            <div class="overview-assign-badge-container"><div class="overview-assign-badge">${initials}</div> <div>${name}</div></div>
            `



            
            
      }
}

