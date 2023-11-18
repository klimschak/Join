
let o = 0;


    


async function initAddTask(){
      await loadTasksToAddTasksFromRemoteStorage();
      o = await getItem('o', (JSON.parse(o)))
      addToTasks();
      
}

async function loadTasksToAddTasksFromRemoteStorage() {
      try {
        tasks = JSON.parse(await getItem("tasks"));
      } catch (e) {
        console.error("Loading error:", e);
      }
    }


function addToTasks() {
      tasks.push({
        assigned: [],
        category: [],
        date: [],
        description: [],
        id: [],
        initials: [],
        priority: [],
        status: [],
        subtasks: {
          subtask: [],
          subtask_id: [],
          completed: [],
        },
        title: [],
      });
      
      }

    




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
            const assignedIds = tasks[o]['id'];
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
      <li class="assign_li" id="form_assign_error"><div class="form_assign_name form_assign_error">No results. Please modify your search. </div></li>
      `;
}


function setStateOfAccountInAssignDropdown(assign, i, accountId, assignedIds) {
      /* Falls dem Account i der Task NICHT zugeordnet wurde, soll dies ausgeführt werden */
      if (!assignedIds.includes(accountId)) { 
            assign.innerHTML += /*html*/`
            <li class="assign_li" id="assignaccount${i}" onclick="checkIfAssigned(${i}), stopClickPropagation(event)"><div class="form_assign_badge">${accounts[i]['initials']}</div><div class="form_assign_name">${accounts[i]['name']}</div><img id="assigncheck${i}" src="./assets/img/checkbutton_default.svg" alt=""></li>`;
      }
      /* Falls dem Account i der Task zugeordnet wurde, soll dies ausgeführt werden */
      if (assignedIds.includes(accountId)) { 
            assign.innerHTML += /*html*/`
            <li class="assign_li selected" id="assignaccount${i}" onclick="checkIfAssigned(${i}), stopClickPropagation(event)"><div class="form_assign_badge">${accounts[i]['initials']}</div><div class="form_assign_name">${accounts[i]['name']}</div><img id="assigncheck${i}" src="./assets/img/checkbutton_checked.svg" alt=""></li>`;
      }
}


function checkIfAssigned(i) {
      const accountId = accounts[i]['id'];
      const assignedIds = tasks[o]['id'];
      const accountName = `${accounts[i]['name']}`;
      const index = tasks[o]['assigned'].indexOf(accountName);
      let badge = document.getElementById('form_assign_badge')
      let assignbadge = document.getElementById(`assign_badge${i}`);
      ifAccountIsNotAssigned(i, accountId, assignedIds, badge)
      ifAccountIsAssigned(i, index)

}


function ifAccountIsNotAssigned(i, accountId, assignedIds, badge) {
      let assign = document.getElementById(`assign_list`);
      if (!assignedIds.includes(accountId)) {
            tasks[o]['assigned'].push(accounts[i]['name']);
            tasks[o]['id'].push(accountId);
            badge.innerHTML += /*html*/`
                  <div id="assign_badge${i}" class="form_assign_badge">${accounts[i]['initials']}</div>
                  `;
            filterAccountsToAssign()
      }
}


function ifAccountIsAssigned(i, index) {
      let assignbadge = document.getElementById(`assign_badge${i}`);
      if (index !== -1) {
            tasks[o]['assigned'].splice(index, 1);
            tasks[o]['id'].splice(index, 1);
            assignbadge.remove();
            filterAccountsToAssign()
      }
}

let isDropdownOpen = false;

function toggleDropdown(){
const dropdown = document.getElementById('assign_list');
  
  if (isDropdownOpen) {
    dropdown.classList.add('d-none');
    isDropdownOpen = false;
  } else {
    dropdown.classList.remove('d-none');
    isDropdownOpen = true;
    document.addEventListener('click', closeDropdownOnClickOutside);
  }
}

function closeDropdownOnClickOutside(event) {
      const dropdown = document.getElementById('assign_list');
      const container = document.getElementById('form_assign_container');
    
      if (!container.contains(event.target)) {
        // Klicken außerhalb des "form_assign_container" erkannt, schließe das Dropdown
        dropdown.classList.add('d-none');
        isDropdownOpen = false;
        // Entfernen des "Klick außerhalb" Ereignisses
        document.removeEventListener('click', closeDropdownOnClickOutside);
      }
    }

// Funktion, um das Klicken am <li> zu stoppen
function stopClickPropagation(event) {
      event.stopPropagation();
    }


function openDropdownOnInput (){
      const dropdown = document.getElementById('assign_list');
      dropdown.classList.remove('d-none');
      isDropdownOpen = true;
}



//subtaskInput.addEventListener('blur', showSubtaskInputIcons);





/* 
|||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||| Priorities ||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||  
*/

let currentPriority = 0;

function setPriority(prio) {
      let urgent = document.getElementById('urgent');
      let medium = document.getElementById('medium');
      let low = document.getElementById('low');
      

      if (prio === 1 && prio != currentPriority || prio === 2 && prio != currentPriority  || prio === 3 && prio != currentPriority){
            checkPriority(urgent, medium, low, prio)
      }
            
      else {
            
            deletePriorityFromArray(urgent, medium, low)
      }
}

function checkPriority (urgent, medium, low, prio){
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

function deletePriorityFromArray(urgent, medium, low){
      tasks[o].priority.splice(0, 1);
      urgent.classList.remove("urgent-checked");
      medium.classList.remove("medium-checked");
      low.classList.remove("low-checked");
      urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta.svg" alt="">`;
      medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media.svg" alt="">`;
      low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja.svg" alt="">`;
      currentPriority = 0;
      
}
function activatePrioUrgent(urgent, medium, low) {
      urgent.classList.add("urgent-checked");
      medium.classList.remove("medium-checked");
      low.classList.remove("low-checked");
      urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta_white.svg" alt="">`;
      medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media.svg" alt="">`;
      low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja.svg" alt="">`;
      savePriorityToArray("Urgent")
      currentPriority = 1;
}

function activatePrioMedium(urgent, medium, low) {
      urgent.classList.remove("urgent-checked");
      medium.classList.add("medium-checked");
      low.classList.remove("low-checked");
      urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta.svg" alt="">`;
      medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media_white.svg" alt="">`;
      low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja.svg" alt="">`;
      savePriorityToArray("Medium")
      currentPriority = 2;
}     

function activatePrioLow(urgent, medium, low) {
      urgent.classList.remove("urgent-checked");
      medium.classList.remove("medium-checked");
      low.classList.add("low-checked");
      urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta.svg" alt="">`;
      medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media.svg" alt="">`;
      low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja_white.svg" alt="">`;
      savePriorityToArray("Low")
      currentPriority = 3;
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

function closeCategoryDropdownOnClickOutside(event) {
      const category = document.getElementById('category_dropdown');
      const container = document.getElementById('category_field_dropdown_container');
      if (!container.contains(event.target)) {
        
        // Entfernen des "Klick außerhalb" Ereignisses
        document.removeEventListener('click', closeCategoryDropdownOnClickOutside);
        isDropdownOpen = false;
        category.innerHTML = "";
      }
    }

    let isCategoryDropdownOpen = false;

    function toggleCategoryDropdown(){
    const category = document.getElementById('category_dropdown');
      
      if (isDropdownOpen) {
        category.innerHTML = "";
        isDropdownOpen = false;
      } else {
        document.addEventListener('click', closeCategoryDropdownOnClickOutside);
        openCategoryDropdown();
        isDropdownOpen = true;
      }
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
            ul_subtask.innerHTML += htmlTemplateSaveSubtaskInLi(subtaskValue);
            saveSubtaskToArray(subtaskValue);
            resetSubtaskInput();
            subtaskInput.focus();
      }
}

function htmlTemplateSaveSubtaskInLi(subtaskValue){
      return /* html */`
      <li class="li_subtask_task" onmouseenter="showSubtaskEditIcons(${subtaskCounter})" onmouseleave="hideSubtaskEditIcons(${subtaskCounter})" >
            <img src="./assets/img/bulletpoint.svg" alt="" class="bulletpoint">
            <span>${subtaskValue}</span>
            <div class="li_subtask_icon d-none" id="li${subtaskCounter}">
                  <img src="./assets/img/delete.svg" alt="" onclick="deleteSubtask(${subtaskCounter})">
                  <hr>
                  <img src="./assets/img/subtask_edit.svg" alt="">
            </div>
      </li>`;
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
      const subtaskIndexToDelete = tasks[o].subtasks.subtask_id.indexOf(i);
      if (subtaskIndexToDelete !== -1) {
            tasks[o].subtasks.subtask.splice(subtaskIndexToDelete, 1); // Lösche den Subtask
            tasks[o].subtasks.subtask_id.splice(subtaskIndexToDelete, 1); // Lösche die subtask_id
          }
          renderSubtasks()
}

function renderSubtasks(){
      let liSubtask = document.getElementById('ul_subtask_task');
      liSubtask.innerHTML = "";
      const subtasks = tasks[o].subtasks.subtask;
      for (let i = 0; i < subtasks.length; i++) {
            const subtaskenktry = tasks[o].subtasks.subtask[i];
            const subtaskId = tasks[o].subtasks.subtask_id[i];
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
      tasks[o]['subtasks'].subtask.push(subtaskValue);
      tasks[o]['subtasks'].subtask_id.push(subtaskCounter);
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

async function createTask() {
      
      saveFormInputToArray();
      saveTextareaInputToArray();
      saveTheDateToArray();
      setTaskStatus();
      await saveTaskToRemoteStorage();
}    




function setTaskStatus(){
      let taskStatus = "to-do-column"
      tasks[o].status.push(taskStatus);

}

function saveFormInputToArray(){
      let input = document.getElementById('input_title')
      let inputValue = input.value;
      tasks[o].title.push(inputValue);
}

function saveTextareaInputToArray(){
      let input = document.getElementById('textarea_description')
      let inputValue = input.value;
      tasks[o].description.push(inputValue);
}

function savePriorityToArray(Prio){
      tasks[o].priority.splice(0, 1)
      tasks[o].priority.push(Prio);
}

function saveCategoryToArray(category) {
      tasks[o].category.splice(0, 1)
      tasks[o].category.push(category)

}

function saveTheDateToArray(){
      let dueDate = document.getElementById("date-picker").value
      tasks[o].date.push(dueDate);
}




function closeAccountsInAssignDropdown() {
      let assign = document.getElementById(`assign_list`);
      assign.innerHTML = "";
      let category = document.getElementById('category_dropdown');
      category.innerHTML = "";
}


async function saveTaskToRemoteStorage(){
      await setItem('tasks', (JSON.stringify(tasks)))
      o++;
      await setItem('o', (JSON.stringify(o)))

      await getItem('o', (JSON.parse(o)))
     
      
      
}




/* Datum aus Array ins date feld laden
function loadTheDateFromArray(){
      const dateArray = tasks[o].date;
      const dateValue = dateArray[0];
      const dateInput = document.getElementById('date-picker');
      dateInput.value = dateValue;
} */