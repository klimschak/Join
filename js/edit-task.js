
// Die Funktion übernimmt die TaskID mit der das dazugehörige Array angesteuert werden kann
// Die Funktion bildet den Start, um Tasks zu editieren
async function loadTaskEdit(taskID) {
      let overlay = document.getElementById('edit-task-overlay');
      overlay.classList.remove('d-none');
      document.getElementById('task-overview-overlay').classList.add('d-none')
      //addEventlistenerToSubtaskField ()
      console.log('Task ID:', taskID);
      let task = tasks[taskID];
      renderEditTaskBackground()
      renderEditTaskContent(taskID)
      
      

    }

// Funktion die die einzelnen Formularelemente rendert
// Zuerst sollen die Formularelemente im Iniitalzustand erstellt werden
// Funktion die die einzelnen Formularelemente mit den Inhalten aus dem Array befüllt

function renderEditTaskBackground(){
  let overlay = document.getElementById('edit-task-overlay');
  overlay.innerHTML = /*html*/`
    <div id="edit-task-container" class="edit-task-container"></div>
    `
}


function renderEditTaskContent(taskID){
      let container = document.getElementById('edit-task-container');
      let task = tasks[taskID];
      container.innerHTML = "";
      loadCategoryInEditTask(task, container);
      loadTitleInEditTask(task, container);
      loadDescriptionInEditTask(task, container);
      loadDateInEditTask(task, container);
      loadPriorityInEditTask(task, container);
      loadAssignedInEditTask(task, container, taskID);
      loadAssignedBadgesInEditTask(task);
      loadSubtasksInEditTask(container, task);

}

function loadCategoryInEditTask(task, container){
  container.innerHTML += /*html*/`
                        <div class="category_container">
                              <div class="category_label">
                                    <h4>Category<span class="required">*</span></h4>
                              </div>

                              <div class="category_field_dropdown_container pointer" id="category_field_dropdown_container">
                                    <div class="category_field" onclick="toggleCategoryDropdown()">
                                          <p id="category_field_title" class="category_field_title">${task.category}</p>
                                          <img src="./assets/img/arrow_drop_downaa.svg" alt="">
                                    </div>
                                    <ul id="category_dropdown" class="category_dropdown">

                                    </ul>
                              </div>
                              <div class="form_input_notice">
                                    <p class="d-none">This field is required</p>
                              </div>
                        </div>
    `
}

function loadTitleInEditTask(task, container){
      container.innerHTML += /*html*/`
            <div class="form_input_container">
                  <div class="form_input_label">
                         <h4>Title<span class="required">*</span></h4>
                  </div>
                  <input class="form_input_field" id="input_title" name="addtask_title" placeholder="Enter a Title"
                        required="required" value="${task.title}">
                  <div class="form_input_notice">
                        <p class="d-none">This field is required</p>
                  </div>
            </div>
      `
}

function loadDescriptionInEditTask(task, container){
      container.innerHTML += /*html*/`
            <div class="form_textarea_container">
                  <div class="form_textarea_label">
                        <h4>Description<span class="required">*</span></h4>
                  </div>
                  <textarea class="form_textarea_field" id="textarea_description" name="addtask_description"
                        placeholder="Enter a Description">${task.description}</textarea>
                  <div class="form_textarea_notice">
                        <p class="d-none">This field is required</p>
                  </div>
            </div>
      `
}
function loadDateInEditTask(task, container){
      container.innerHTML += /*html*/`
            <div class="form_input_container">
                  <div class="form_input_label">
                        <h4>Due date<span class="required">*</span></h4>
                  </div>

                  <input class="form_input_field date_field pointer" type="date" id="date-picker" name="datum"
                        required="required" value="${task.date}">

                  <div class="form_input_notice">
                        <p class="d-none">This field is required</p>
                  </div>
            </div>
      `
}
function loadPriorityInEditTask(task, container){
      taskpriority = task.priority;
      console.log('taskpriority:', taskpriority);
      container.innerHTML += /*html*/`
            <div class="prio_container">
                  <div class="prio_label">
                        <h4>Priority</h4>
                  </div>
                  <div class="prio_button_container">
                        <button class="prio_button" type="button" id="urgent-edit" onclick="setPriorityButtonInEdit('Urgent')">
                              <p>Urgent</p><img src="./assets/img/Prio_alta.svg" alt="">
                        </button>
                        <button class="prio_button" type="button" id="medium-edit" onclick="setPriorityButtonInEdit('Medium')">
                              <p>Medium</p><img src="./assets/img/Prio_media.svg" alt="">
                        </button>
                        <button class="prio_button" type="button" id="low-edit" onclick="setPriorityButtonInEdit('Low')">
                              <p>Low</p><img src="./assets/img/Prio_baja.svg" alt="">
                        </button>

                  </div>
            </div>
      `
            let urgent = document.getElementById('urgent-edit');
            let medium = document.getElementById('medium-edit');
            let low = document.getElementById('low-edit');
   
      if (taskpriority == 'Urgent') {
            urgent.classList.add("urgent-checked");
            medium.classList.remove("medium-checked");
            low.classList.remove("low-checked");
            urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta_white.svg" alt="">`;
            medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media.svg" alt="">`;
            low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja.svg" alt="">`;
      }
      if (taskpriority == 'Medium') {
            urgent.classList.remove("urgent-checked");
            medium.classList.add("medium-checked");
            low.classList.remove("low-checked");
            urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta.svg" alt="">`;
            medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media_white.svg" alt="">`;
            low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja.svg" alt="">`;
      }
      if (taskpriority == 'Low') {
            urgent.classList.remove("urgent-checked");
            medium.classList.remove("medium-checked");
            low.classList.add("low-checked");
            urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta.svg" alt="">`;
            medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media.svg" alt="">`;
            low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja_white.svg" alt="">`;
      }
}

function setPriorityButtonInEdit (priority){
      let urgent = document.getElementById('urgent-edit');
      let medium = document.getElementById('medium-edit');
      let low = document.getElementById('low-edit');
      if (priority == 'Urgent') {
            urgent.classList.add("urgent-checked");
            medium.classList.remove("medium-checked");
            low.classList.remove("low-checked");
            urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta_white.svg" alt="">`;
            medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media.svg" alt="">`;
            low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja.svg" alt="">`; 
      }
      if (priority == 'Medium') {
            urgent.classList.remove("urgent-checked");
            medium.classList.add("medium-checked");
            low.classList.remove("low-checked");
            urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta.svg" alt="">`;
            medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media_white.svg" alt="">`;
            low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja.svg" alt="">`;
      }
      if (priority == 'Low') {
            urgent.classList.remove("urgent-checked");
            medium.classList.remove("medium-checked");
            low.classList.add("low-checked");
            urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta.svg" alt="">`;
            medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media.svg" alt="">`;
            low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja_white.svg" alt="">`;
      }
      
}

function loadAssignedInEditTask(task, container, taskID){
      taskIndex = taskID;
      container.innerHTML += /*html*/`
            <div class="form_assign_container"  >
                  <div class="form_assign_label">
                        <h4>Assigned to</h4>
                  </div>

                  <div class="form_assign_field_list_container" id="form_assign_container">
                        <div class="form_assign_field_container" onclick="toggleDropdown(), filterAccountsToAssign()">
                              <input class="form_assign_field " name="assign_title" id="search_accounts_to_assign"
                                    placeholder="Select contacts" oninput="openDropdownOnInput(), filterAccountsToAssign()"><img
                                    src="./assets/img/arrow_drop_downaa.svg" class="pointer" alt="">
                        </div>
                        <ul id="assign_list" class="form_assign_dropdown "></ul>
                  </div>

                  <div id="form_assign_badge" class="form_assign_badge_container"></div>

                  <div class="form_assign_notice">
                        <p class="d-none">This field is required</p>
                  </div>
            </div>
      `
}

function loadAssignedBadgesInEditTask(task) {
      let initials = task.initials;
      let badgesDiv = document.getElementById('form_assign_badge');
      for (let i = 0; i < initials.length; i++) {
            let initial = initials[i];
            badgesDiv.innerHTML += /*html*/`
            <div id="assign_badge${i}" class="form_assign_badge">${initial}</div>
            `

            
      }
}
function loadSubtasksInEditTask(container) {
      
      container.innerHTML += /*html*/`

                  <div class="subtask_container">
                        <div class="subtask_label">
                              <h4>Subtasks</h4>
                        </div>

                        <div class="subtask_input_container" id="subtask_input_container">
                              <input class="subtask_input" id="subtask_input" name="subtaskt_title" placeholder="Add subtask" id="subtask_input">
                              <div id="subtask_input_icon" class="subtask_input_icon pointer" >
                                    <img onclick="showSubtaskInputIcons()" src="./assets/img/subtask_add.svg" alt="">
                              </div>
                        </div>

                        <ul class="ul_subtask_task" id="ul_subtask_task">
                             
                        </ul>

                        <div class="subtask_notice">
                              <p class="d-none">This field is required</p>
                        </div>
                  </div>
            `

            
      }



