function filterAccountsToAssign() {
      let search = document.getElementById("search_accounts_to_assign").value
      search = search.toLowerCase();
      console.log(search)
      let assign = document.getElementById(`assign_list`);
      assign.innerHTML = "";
      displayAccountsInAssignDropdown(search, assign)
}


function displayAccountsInAssignDropdown(search, assign) {
      for (let i = 0; i < accounts.length; i++) {
            const accountId = accounts[i]['id'];
            const assignedIds = tasks[0]['id'];
            const accountName = accounts[i]['name'];
            if (document.getElementById("form_assign_error")) {
                  document.getElementById("form_assign_error").remove();
            }
            if (accountName.toLowerCase().includes(search)) {
                  setStateOfAccountInAssignDropdown(assign, i, accountId, assignedIds);
            }
            if (search.length >= 1 && assign.childElementCount === 0 && !accountName.toLowerCase().includes(search)) {
                  displayErrorIfNoResultsInAccountsToAssign(assign);
            }
      }
}


function displayErrorIfNoResultsInAccountsToAssign(assign) {
      assign.innerHTML = /*html*/`
      <li id="form_assign_error"><div class="form_assign_name form_assign_error">No results. Please modify your search. </div></li>
      `;
}


function setStateOfAccountInAssignDropdown(assign, i, accountId, assignedIds) {
      /* Falls dem Account i der Task NICHT zugeordnet wurde, soll dies ausgeführt werden */
      if (!assignedIds.includes(accountId)) { 
            assign.innerHTML += /*html*/`
            <li id="assignaccount${i}" onclick="checkIfAssigned(${i})"><div class="form_assign_badge">${accounts[i]['initials']}</div><div class="form_assign_name">${accounts[i]['name']}</div><img id="assigncheck${i}" src="./assets/img/checkbutton_default.svg" alt=""></li>`;
      }
      /* Falls dem Account i der Task zugeordnet wurde, soll dies ausgeführt werden */
      if (assignedIds.includes(accountId)) { 
            assign.innerHTML += /*html*/`
            <li id="assignaccount${i}" onclick="checkIfAssigned(${i})"><div class="form_assign_badge">${accounts[i]['initials']}</div><div class="form_assign_name">${accounts[i]['name']}</div><img id="assigncheck${i}" src="./assets/img/checkbutton_checked.svg" alt=""></li>`;
      }
}


function checkIfAssigned(i) {
      const accountId = accounts[i]['id'];
      const assignedIds = tasks[0]['id'];
      const accountName = `${accounts[i]['name']}`;
      const index = tasks[0]['assigned'].indexOf(accountName);
      let badge = document.getElementById('form_assign_badge')
      let assignbadge = document.getElementById(`assign_badge${i}`);
      ifAccountIsNotAssigned(i, accountId, assignedIds, badge)
      ifAccountIsAssigned(i, index, assignbadge)

}


function ifAccountIsNotAssigned(i, accountId, assignedIds, badge) {
      if (!assignedIds.includes(accountId)) {
            tasks[0]['assigned'].push(accounts[i]['name']);
            tasks[0]['id'].push(accountId);
            document.getElementById(`assigncheck${i}`).src = './assets/img/checkbutton_checked.svg';
            badge.innerHTML += /*html*/`
                  <div id="assign_badge${i}" class="form_assign_badge">${accounts[i]['initials']}</div>
                  `
      }
}


function ifAccountIsAssigned(i, index, assignbadge) {
      if (index !== -1) {
            tasks[0]['assigned'].splice(index, 1);
            tasks[0]['id'].splice(index, 1);
            document.getElementById(`assigncheck${i}`).src = './assets/img/checkbutton_default.svg';
            assignbadge.remove();
      }
}


/* 
|||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||| Priorities ||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||  
*/
function setPriority(prio) {
      let urgent = document.getElementById('urgent');
      let medium = document.getElementById('medium');
      let low = document.getElementById('low');
      let selectedPriority;
      if (prio === 1) {
            activatePrioUrgent(urgent, medium, low)
      }
      if (prio === 2) {
            activatePrioMedium(urgent, medium, low)
      }
      if (prio === 3) {
            activatePrioLow(urgent, medium, low)
      }
}

function activatePrioUrgent(urgent, medium, low) {
      urgent.classList.add("urgent-checked");
      medium.classList.remove("medium-checked");
      low.classList.remove("low-checked");
      urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta_white.svg" alt="">`;
      medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media.svg" alt="">`;
      low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja.svg" alt="">`;
      savePriorityToArray("Urgent")
}


function activatePrioMedium(urgent, medium, low) {
      urgent.classList.remove("urgent-checked");
      medium.classList.add("medium-checked");
      low.classList.remove("low-checked");
      urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta.svg" alt="">`;
      medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media_white.svg" alt="">`;
      low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja.svg" alt="">`;
      savePriorityToArray("Medium")
}     


function activatePrioLow(urgent, medium, low) {
      urgent.classList.remove("urgent-checked");
      medium.classList.remove("medium-checked");
      low.classList.add("low-checked");
      urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta.svg" alt="">`;
      medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media.svg" alt="">`;
      low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja_white.svg" alt="">`;
      savePriorityToArray("Low")
}  


/* 
|||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||| Categories ||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||  
*/

function openCategoryDropdown() {
      let category = document.getElementById('category_dropdown');
      category.innerHTML = "";
      category.innerHTML =/*html*/ `
            <li class="category-list" onclick="setTaskCategory('Technical Task')">Technical Task</li>
            <li class="category-list" onclick="setTaskCategory('User Story')">User Story</li>
            `;
}

function setTaskCategory(category) {
      let title = document.getElementById('category_field_title');
      title.innerHTML = /*html*/ `
      ${category}`;
      let wipeCategoryDropdown = document.getElementById('category_dropdown');
      wipeCategoryDropdown.innerHTML = "";
      saveCategoryToArray(category);
}

/* 
|||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||| Subtasks ||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||  
*/
let subtaskCounter = 0;
let subtaskInput = document.getElementById('subtask_input');
subtaskInput.addEventListener('focus', showSubtaskInputIcons);

function showSubtaskInputIcons() {

      let subtaskInputIcon = document.getElementById('subtask_input_icon');
      subtaskInputIcon.innerHTML =
      /*html*/`                              
   
              <img src="./assets/img/subtask_abort.svg" alt="" onclick="resetSubtaskInput()">
              <hr>
              <img src="./assets/img/subtask_save.svg" alt="" onclick="saveSubtaskInLi()" >
        
      `;
      

      subtaskInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                  saveSubtaskInLi();
            }
          });

          subtaskInput.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                  resetSubtaskInput();
            }
          });
          
}


function saveSubtaskInLi() {
      let ul_subtask = document.getElementById('ul_subtask_task');
      let subtaskInput = document.getElementById('subtask_input');
      let subtaskValue = subtaskInput.value;

      if (subtaskValue.trim() !== '') {
            ul_subtask.innerHTML += /* html */`
                  <li class="li_subtask_task" onmouseenter="showSubtaskEditIcons(${subtaskCounter})" onmouseleave="hideSubtaskEditIcons(${subtaskCounter})" >
                        <img src="./assets/img/bulletpoint.svg" alt="" class="bulletpoint">
                        <span>${subtaskValue}</span>
                        <div class="li_subtask_icon d-none" id="li${subtaskCounter}">
                        <img src="./assets/img/delete.svg" alt="" onclick="deleteSubtask(${subtaskCounter})">
                        <hr>
                        <img src="./assets/img/subtask_edit.svg" alt="">
                        </div>
                  </li>`;
            saveSubtaskToArray(subtaskValue);
            resetSubtaskInput();
            subtaskInput.focus();
      }
}


function showSubtaskEditIcons(i) {
      let subtask = document.getElementById(`li${i}`);
      subtask.classList.remove("d-none")
}


function hideSubtaskEditIcons(i) {
      let subtask = document.getElementById(`li${i}`);
      subtask.classList.add("d-none")
}


function resetSubtaskInput() {
      subtaskInput.blur();
      subtaskInput.value = '';
      let subtaskInputIcon = document.getElementById('subtask_input_icon');
      subtaskInputIcon.innerHTML =
      /*html*/`                              
            <img src="./assets/img/subtask_add.svg" alt="">
      `;
}


function deleteSubtask(i){
      const subtaskIndexToDelete = tasks[0].subtasks.subtask_id.indexOf(i);
      if (subtaskIndexToDelete !== -1) {
            tasks[0].subtasks.subtask.splice(subtaskIndexToDelete, 1); // Lösche den Subtask
            tasks[0].subtasks.subtask_id.splice(subtaskIndexToDelete, 1); // Lösche die subtask_id
          }
          renderSubtasks()
}

function renderSubtasks(){
      let liSubtask = document.getElementById('ul_subtask_task');
      liSubtask.innerHTML = "";
      const subtasks = tasks[0].subtasks.subtask;
      for (let i = 0; i < subtasks.length; i++) {
            const subtaskenktry = tasks[0].subtasks.subtask[i];
            const subtaskId = tasks[0].subtasks.subtask_id[i];
            liSubtask.innerHTML += renderSubtasksHtmlTemplate(subtaskenktry, subtaskId)
            
      }
}

function renderSubtasksHtmlTemplate(subtaskentry, subtaskId){
      return /* html */  `
      <li class="li_subtask_task" onmouseenter="showSubtaskEditIcons(${subtaskId})" onmouseleave="hideSubtaskEditIcons(${subtaskId})" >
            <img src="./assets/img/bulletpoint.svg" alt="" class="bulletpoint">
            <span>${subtaskentry}</span>
            <div class="li_subtask_icon d-none" id="li${subtaskId}">
            <img src="./assets/img/delete.svg" alt="" onclick="deleteSubtask(${subtaskId})">
            <hr>
            <img src="./assets/img/subtask_edit.svg" alt="">
            </div>
      </li>`
}

function saveSubtaskToArray(subtaskValue) {
      tasks[0]['subtasks'].subtask.push(subtaskValue);
      tasks[0]['subtasks'].subtask_id.push(subtaskCounter);
      subtaskCounter++;
}


function setToFocus(element) {
      const focusElement = document.getElementById(element);
      focusElement.focus();
}


/* 
|||||||||||||||||||||||||||||||||||||||||||||
||||||||||||| Save Tasks to Arrays|||||||||||
|||||||||||||||||||||||||||||||||||||||||||||  
*/

function createTask(){
      saveFormInputToArray();
      saveTextareaInputToArray();
      saveTheDateToArray();
      
      
}

function saveFormInputToArray(){
      let input = document.getElementById('input_title')
      let inputValue = input.value;
      tasks[0].title.push(inputValue);
}

function saveTextareaInputToArray(){
      let input = document.getElementById('textarea_description')
      let inputValue = input.value;
      tasks[0].description.push(inputValue);
}

function savePriorityToArray(Prio){
      tasks[0].priority.splice(0, 1)
      tasks[0].priority.push(Prio);
}

function saveCategoryToArray(category) {
      tasks[0].category.splice(0, 1)
      tasks[0].category.push(category)

}

function saveTheDateToArray(){
      let dueDate = document.getElementById("date-picker").value
      tasks[0].date.push(dueDate);
}

function loadTheDateFromArray(){
      const dateArray = tasks[0].date;
      const dateValue = dateArray[0];
      const dateInput = document.getElementById('date-picker');
      dateInput.value = dateValue;
}


function closeAccountsinAssignDropdown() {
      let assign = document.getElementById(`assign_list`);
      assign.innerHTML = "";
      let category = document.getElementById('category_dropdown');
      category.innerHTML = "";
}
