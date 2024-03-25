
// Die Funktion übernimmt die TaskID mit der das dazugehörige Array angesteuert werden kann
// Die Funktion bildet den Start, um Tasks zu editieren
async function loadTaskEdit(taskID) {
      let overlay = document.getElementById('edit-task-overlay');
      overlay.classList.remove('d-none');
      document.getElementById('task-overview-overlay').classList.add('d-none')
      //addEventlistenerToSubtaskField ()
      console.log('Task ID:', taskID);
      let task = tasks[taskID];
      renderEditTaskBackground();
      renderEditTaskContent(taskID);
      addEventlistenerToSubtaskField();
      
      
      

    }

    function closeEditOverlay(taskID){
      let overlay = document.getElementById('edit-task-overlay');
      loadTaskOverview(taskID);
      overlay.classList.add('d-none');
      
    }


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
      loadOverlayHeader(container, taskID);
      loadCategoryInEditTask(task, container);
      loadTitleInEditTask(task, container);
      loadDescriptionInEditTask(task, container);
      loadDateInEditTask(task, container);
      loadPriorityInEditTask(task, container);
      loadAssignedInEditTask(task, container, taskID);
      loadAssignedBadgesInEditTask(task);
      loadSubtasksInEditTask(container, task);
      loadOkButtonInEditTask(container, taskID);
      renderSubtasks();
      statusVar = task.status;
      addEventlistenerToSubtaskField();



}

function loadOverlayHeader(container, taskID){
      container.innerHTML += /*html*/`
       <div class="overview-category-close">
                        <h2>Edit Task</h2>
                        <div class="close-icon overview-close pointer"><img  onclick="closeEditOverlay(${taskID})" src="./assets/img/Close.svg" alt=""></div>
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
                  onclick="removeError('title')" required="required" value="${task.title}">
                  <div class="form_input_notice">
                        <p class="d-none" id="input-validation">This field is required</p>
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
                  <textarea onclick="removeError('description')" class="form_textarea_field" id="textarea_description" name="addtask_description"
                        placeholder="Enter a Description">${task.description}</textarea>
                  <div class="form_textarea_notice">
                        <p class="d-none" id="textarea-validation">This field is required</p>
                  </div>
            </div>
      `
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
                        <div id="assign_list_container" class="d-none">
                                          <div class="assign_ul_button">
                                                <ul id="assign_list" class="form_assign_dropdown "></ul>
                                                <div class="assign_add_contact">
                                                      <button type="button" class="form-add-task-btn"><span>Add New Contact</span><img src="./assets/img/person_add.svg" alt=""></button></div>
                                                
                                          </div>
                                    </div>
                  </div>

                  <div id="form_assign_badge" class="form_assign_badge_container" ></div>

                  <div class="form_assign_notice">
                        <p class="d-none">This field is required</p>
                  </div>
            </div>
      `
}

function loadAssignedBadgesInEditTask(task) {
      let initials = task.initials;
      let colorId = task.id;
      let badgesDiv = document.getElementById('form_assign_badge');
      badgesDiv.innerHTML = "";
      for (let i = 0; i < initials.length; i++) {
            let initial = initials[i];
            const color = colorId[i];
            const accountWithColorId = accounts.find(account => account.id === color);
            const colorValue = accountWithColorId ? accountWithColorId.color : 'Nicht gefunden';
            badgesDiv.innerHTML += /*html*/`
            <div id="assign_badge${i}" class="form_assign_badge" style="background-color: ${colorValue};">${initial}</div>
            `

            
      }
}

function loadDateInEditTask(task, container){
      container.innerHTML += /*html*/`
            <div class="form_input_container">
                  <div class="form_input_label">
                        <h4>Due date<span class="required">*</span></h4>
                  </div>

                  <input onclick="removeError('date')" class="form_input_field date_field pointer" type="date" id="date-picker" name="datum"
                        required="required" value="${task.date}">

                  <div class="form_input_notice">
                        <p id="date-validation" class="d-none">This field is required</p>
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
                  <div class="prio_button_container" onclick="removeError('prio')">
                        <button class="prio_button" type="button" id="urgent" onclick="setPriority(1)">
                              <p>Urgent</p><img src="./assets/img/Prio_alta.svg" alt="">
                        </button>
                        <button class="prio_button" type="button" id="medium" onclick="setPriority(2)">
                              <p>Medium</p><img src="./assets/img/Prio_media.svg" alt="">
                        </button>
                        <button class="prio_button" type="button" id="low" onclick="setPriority(3)">
                              <p>Low</p><img src="./assets/img/Prio_baja.svg" alt="">
                        </button>

                  </div>
                  <div class="form_input_notice">
                                    <p class="d-none" id="prio-validation">Select a Priority</p>
                              </div>
            </div>
      `
            let urgent = document.getElementById('urgent');
            let medium = document.getElementById('medium');
            let low = document.getElementById('low');
   
      if (taskpriority == 'Urgent') {
            urgent.classList.add("urgent-checked");
            medium.classList.remove("medium-checked");
            low.classList.remove("low-checked");
            urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta_white.svg" alt="">`;
            medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media.svg" alt="">`;
            low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja.svg" alt="">`;
            currentPriority = 3
      }
      if (taskpriority == 'Medium') {
            urgent.classList.remove("urgent-checked");
            medium.classList.add("medium-checked");
            low.classList.remove("low-checked");
            urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta.svg" alt="">`;
            medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media_white.svg" alt="">`;
            low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja.svg" alt="">`;
            currentPriority = 2
      }
      if (taskpriority == 'Low') {
            urgent.classList.remove("urgent-checked");
            medium.classList.remove("medium-checked");
            low.classList.add("low-checked");
            urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta.svg" alt="">`;
            medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media.svg" alt="">`;
            low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja_white.svg" alt="">`;
            currentPriority = 1
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



function loadCategoryInEditTask(task, container){
      container.innerHTML += /*html*/`
                            <div class="category_container">
                                  <div class="category_label">
                                        <h4 class="category-label-edit">Category</h4>
                                  </div>
    
                                  <div class="category_field_dropdown_container pointer"  id="category_field_dropdown_container">
                                        <div class="category_field category-edit-task">
                                              <p id="category_field_title" class="category_field_title">${task.category}</p>
                                              
                                        </div>
                                        <ul id="category_dropdown" class="category_dropdown">
    
                                        </ul>
                                  </div>
                                  <div class="form_input_notice">
                                        <p id="category-validation" class="category-note">Category can't be changed.</p>
                                  </div>
                            </div>
        `
    }


function loadSubtasksInEditTask(container) {
      
      container.innerHTML += /*html*/`

                  <div class="subtask_container">
                        <div class="subtask_label">
                              <h4>Subtasks</h4>
                        </div>

                        <div class="subtask_input_container" id="subtask_input_container">
                              <input class="subtask_input" id="subtask_input" name="subtaskt_title" placeholder="Add subtask">
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

function loadOkButtonInEditTask(container, taskID){
      container.innerHTML += /*html*/`
      <div class="edit-button-container">
      <button type="button" onclick="validateEditForm(${taskID})" class="primary-button edit"><span>Save Task</span><img src="./assets/img/check.svg" alt=""></button>
      </div>
      `
  
}


async function saveEditTask(taskID) {
      
      saveEditFormInputToArray(taskID);
      saveEditTextareaInputToArray(taskID);
      saveEditTheDateToArray(taskID);
      await saveTaskToRemoteStorage();
      await toggleNotification();
      closeEditOverlay(taskID);
}  

function saveEditFormInputToArray(taskID){
      let task = tasks[taskID];
      let input = document.getElementById('input_title')
      let inputValue = input.value;
      task.title = inputValue
}

function saveEditTextareaInputToArray(taskID){
      let task = tasks[taskID];
      let input = document.getElementById('textarea_description')
      let inputValue = input.value;
      task.description = inputValue;
}


function saveEditTheDateToArray(taskID){
      let task = tasks[taskID];
      let dueDate = document.getElementById("date-picker").value
      task.date = dueDate;
}


function validateEditForm(taskID) {
      
      let title = document.getElementById('input_title')
      let task = tasks[taskID];
      

      
      if (title.value.trim() === "") {
            
            document.getElementById('input-validation').classList.remove("d-none")
            title.classList.add('form-error')

      }
      let description = document.getElementById('textarea_description')

      if (description.value.trim() === "") {
            
            document.getElementById('textarea-validation').classList.remove("d-none")
            description.classList.add('form-error')
           

      }

      let date = document.getElementById('date-picker')

      if (date.value.trim() === "") {
            
            document.getElementById('date-validation').classList.remove("d-none")
            date.classList.add('form-error')

      }


      if (currentPriority === 0) {
            
            document.getElementById('prio-validation').classList.remove("d-none")
            urgent.classList.add('form-error')
            medium.classList.add('form-error')
            low.classList.add('form-error')

      }

      let category = document.getElementById('category_field_title')

      if (category.innerText === "Select task category") {
            
            document.getElementById('category-validation').classList.remove("d-none")
            document.getElementById('category_field').classList.add('form-error')

      }

      if (title.value.trim() !== "" && description.value.trim() !== "" && date.value.trim() !== "" && currentPriority !== 0 && category.innerText !== "Select task category" ) 
      {
            
            saveEditTask(taskID)
}

}

function removeEditError(element) {
      if (element === "title") {
            document.getElementById('input_title').classList.remove('form-error')
            document.getElementById('input-validation').classList.add("d-none")
            
      }

      if (element === "description") {
            document.getElementById('textarea_description').classList.remove('form-error')
            document.getElementById('textarea-validation').classList.add("d-none")
            
            
      }

      if (element === "date") {
            document.getElementById('date-picker').classList.remove('form-error')
            document.getElementById('date-validation').classList.add("d-none")
            
      }
      if (element === "prio") {
            urgent.classList.remove('form-error')
            medium.classList.remove('form-error')
            low.classList.remove('form-error')
            document.getElementById('prio-validation').classList.add("d-none")
            
      }

      if (element === "category") {
            document.getElementById('category_field').classList.remove('form-error')
            document.getElementById('category-validation').classList.add("d-none")
            
      }


}