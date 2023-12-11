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
                  <div ><div  id="overview-category">${task.category}</div></div>
                  <div class="overview-title">${task.title}</div>
                  <div class="overview-date">Due Date: ${task.date}</div>
                  <div class="overview-priority">Priority: ${task.priority}</div>
                  <div id="overview-assigned" class="overview-assigned" onload=""></div>
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
            <div>${initials} ${name}</div>
            `



            
            
      }
}

