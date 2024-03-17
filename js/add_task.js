let statusVar;
let taskIndex;

async function deleteUserArray() {

      users = [];
      await setItem("users", JSON.stringify(users)); // Speichere die aktualisierte Benutzerliste.
      await loadUsers();
}

async function initAddTask() {
      await loadTasksToAddTasksFromRemoteStorage();
      await loadLoginData();
      addToTasks();
      addEventlistenerToSubtaskField();

      //createInitialsFromName()
      taskIndex = tasks.length - 1;
      putInitialInTopBar()
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
            subtasks: [],
            title: []
      });
}


function filterAccountsToAssign() {
      let search = document.getElementById("search_accounts_to_assign").value
      search = search.toLowerCase();
      console.log(search)
      let assign = document.getElementById(`assign_list`);
      assign.innerHTML = "";
      displayAccountsInAssignDropdown(search, assign);


}


async function copyUsersToAccounts() {
      await loadUsers();
      await loadContactsOnAddTask()
      let maxId = accounts.length;
      for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].id > maxId) {
                  maxId = accounts[i].id;
            }
      }

      for (let i = 0; i < users.length; i++) {
            maxId++; // Inkrementiere die ID für jeden neuen Kontakt
            let newContact = {
                  id: maxId,
                  name: users[i].username,
                  //initials: userContacts[i].initials,
                  type: "Account" // Setze den Typ auf "Contact" für neue Einträge
            };
            accounts.push(newContact);
      }

      console.log(accounts);
      copyContactsToAccounts()

}

function copyContactsToAccounts() {
      let maxId = accounts.length;
      for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].id > maxId) {
                  maxId = accounts[i].id;
            }
      }

      for (let i = 0; i < userContacts.length; i++) {
            maxId++;
            let newContact = {
                  id: maxId,
                  name: userContacts[i].name,
                  type: "Contact"
            };
            accounts.push(newContact);
      }

      accounts.sort((a, b) => a.name.localeCompare(b.name, 'de', { sensitivity: 'base' }));

      accounts = accounts.map(account => {
            const nameParts = account.name.split(' ');
            const initials = nameParts.map(part => part[0]).join('');
            return { ...account, initials };
      });
      console.log(accounts);
      addColorsToAccounts();



}

const hex_colors = [
      '#E6194B', '#3CB44B', '#E0C112', '#4363D8', '#F58231',
      '#911EB4', '#46F0F0', '#F032E6', '#BCF60C', '#FAA0BE',
      '#008080', '#E6BEFF', '#9A6324', '#F0E68C', '#800000',
      '#AAFFC3', '#808000', '#FFD8B1', '#000075',
      '#469990', '#fabebe', '#e6beff', '#9A6324', '#F0E68C',
      '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075',
      '#ff69b4', '#1e90ff'
];

function addColorsToAccounts() {


      // Farben den Accounts zuweisen
      accounts = accounts.map((account, index) => {
            const colorIndex = index % hex_colors.length; // Stellt sicher, dass bei Überschreitung der Farbliste von vorne begonnen wird
            return { ...account, color: hex_colors[colorIndex] };
      });

      console.log(accounts);
}




function displayAccountsInAssignDropdown(search, assign) {
      for (let i = 0; i < accounts.length; i++) {
            const accountId = accounts[i]['id'];
            const assignedIds = tasks[taskIndex]['id'];
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
            if (accounts[i].type !== 'Account') {
                  assign.innerHTML += /*html*/`
                  <li class="assign_li" id="assignaccount${i}" onclick="checkIfAssigned(${i}), stopClickPropagation(event)"><div class="form_assign_badge" style="background-color: ${accounts[i].color};">${accounts[i]['initials']}</div><div class="form_assign_name">${accounts[i]['name']}</div><img id="assigncheck${i}" src="./assets/img/checkbutton_default.svg" alt=""></li>`;

            }
            if (accounts[i].type === 'Account') {
                  assign.innerHTML += /*html*/`
                  <li class="assign_li" id="assignaccount${i}" onclick="checkIfAssigned(${i}), stopClickPropagation(event)"><div class="form_assign_badge" style="background-color: ${accounts[i].color};">${accounts[i]['initials']}</div><div class="form_assign_name">${accounts[i]['name']} (User)</div><img id="assigncheck${i}" src="./assets/img/checkbutton_default.svg" alt=""></li>`;

            }
      }
      /* Falls dem Account i der Task zugeordnet wurde, soll dies ausgeführt werden */
      if (assignedIds.includes(accountId)) {
            if (accounts[i].type !== 'Account') {assign.innerHTML += /*html*/`
            <li class="assign_li selected" id="assignaccount${i}" onclick="checkIfAssigned(${i}), stopClickPropagation(event)"><div class="form_assign_badge" style="background-color: ${accounts[i].color};">${accounts[i]['initials']}</div><div class="form_assign_name">${accounts[i]['name']}</div><img id="assigncheck${i}" src="./assets/img/checkbutton_checked.svg" alt=""></li>`;
            }
            if (accounts[i].type === 'Account') {assign.innerHTML += /*html*/`
            <li class="assign_li selected" id="assignaccount${i}" onclick="checkIfAssigned(${i}), stopClickPropagation(event)"><div class="form_assign_badge" style="background-color: ${accounts[i].color};">${accounts[i]['initials']}</div><div class="form_assign_name">${accounts[i]['name']} (User)</div><img id="assigncheck${i}" src="./assets/img/checkbutton_checked.svg" alt=""></li>`;
            }

      }
}


function checkIfAssigned(i) {
      const accountId = accounts[i]['id'];
      const assignedIds = tasks[taskIndex]['id'];
      const accountName = `${accounts[i]['name']}`;
      const index = tasks[taskIndex]['assigned'].indexOf(accountName);
      let badge = document.getElementById('form_assign_badge')
      let assignbadge = document.getElementById(`assign_badge${i}`);
      ifAccountIsNotAssigned(i, accountId, assignedIds, badge);
      ifAccountIsAssigned(i, index);
}


function ifAccountIsNotAssigned(i, accountId, assignedIds, badge) {
      let assign = document.getElementById(`assign_list`);
      if (!assignedIds.includes(accountId)) {
            tasks[taskIndex]['assigned'].push(accounts[i]['name']);
            tasks[taskIndex]['initials'].push(accounts[i]['initials']);
            tasks[taskIndex]['id'].push(accountId);
            badge.innerHTML += /*html*/`
                  <div id="assign_badge${i}" class="form_assign_badge" style="background-color: ${accounts[i].color};">${accounts[i]['initials']}</div>
                  `;


            filterAccountsToAssign()
      }
}


function ifAccountIsAssigned(i, index) {
      let assignbadge = document.getElementById(`assign_badge${i}`);
      if (index !== -1) {
            tasks[taskIndex]['assigned'].splice(index, 1);
            tasks[taskIndex]['id'].splice(index, 1);
            tasks[taskIndex]['initials'].splice(index, 1);
            assignbadge.remove();

            filterAccountsToAssign()
      }
}


let isDropdownOpen = false;

function toggleDropdown() {
      const dropdown = document.getElementById('assign_list_container');
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
      const dropdown = document.getElementById('assign_list_container');
      const container = document.getElementById('form_assign_container');
      if (!container.contains(event.target)) {
            // Klicken außerhalb des "form_assign_container" erkannt, schließe das Dropdown
            dropdown.classList.add('d-none');
            isDropdownOpen = false;
            // Entfernen des "Klick außerhalb" Ereignisses
            document.removeEventListener('click', closeDropdownOnClickOutside);
      }
}


function stopClickPropagation(event) {
      event.stopPropagation();
}


function openDropdownOnInput() {
      const dropdown = document.getElementById('assign_list');
      dropdown.classList.remove('d-none');
      isDropdownOpen = true;
}


let currentPriority = 0;

function setPriority(prio) {
      let urgent = document.getElementById('urgent');
      let medium = document.getElementById('medium');
      let low = document.getElementById('low');


      if (prio === 1 && prio != currentPriority || prio === 2 && prio != currentPriority || prio === 3 && prio != currentPriority) {
            checkPriority(urgent, medium, low, prio)
      }
      else {
            deletePriorityFromArray(urgent, medium, low)
      }
}


function checkPriority(urgent, medium, low, prio) {
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


function deletePriorityFromArray(urgent, medium, low) {
      tasks[taskIndex].priority.splice(0, 1);
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

function toggleCategoryDropdown() {
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
      title.innerHTML = /*html*/ `${category}`;
      saveCategoryToArray(category);
      let wipeCategoryDropdown = document.getElementById('category_dropdown');
      wipeCategoryDropdown.innerHTML = "";
}


function addEventlistenerToSubtaskField() {
      let subtaskInput = document.getElementById('subtask_input');
      if (subtaskInput) {
            subtaskInput.addEventListener('focusin', showSubtaskInputIcons);
      } else {
            console.error("Element #subtask_input not found");
      }
}


function showSubtaskInputIcons() {
      let subtaskInput = document.getElementById('subtask_input');
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
      let subtaskInput = document.getElementById('subtask_input');
      let ul_subtask = document.getElementById('ul_subtask_task');
      let subtaskValue = subtaskInput.value;
      if (subtaskValue.trim() !== '') {
            saveSubtaskToArray(subtaskValue);
            let subtaskIndex = tasks[taskIndex].subtasks.length - 1;
            ul_subtask.innerHTML += htmlTemplateSaveSubtaskInLi(subtaskValue, subtaskIndex);
            resetSubtaskInput();
            subtaskInput.focus();
      }
}


function htmlTemplateSaveSubtaskInLi(subtaskValue, subtaskIndex) {
      return /* html */`
      <li class="li_subtask_task" id="li_subtask_task_${subtaskIndex}" onmouseenter="showSubtaskEditIcons(${subtaskIndex})" onmouseleave="hideSubtaskEditIcons(${subtaskIndex})" >
            <img src="./assets/img/bulletpoint.svg" alt="" class="bulletpoint">
            <span>${subtaskValue}</span>
            <div class="li_subtask_icon d-none" id="li${subtaskIndex}">
                  <img src="./assets/img/delete.svg" alt="" onclick="deleteSubtask(${subtaskIndex})">
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
      let subtaskInput = document.getElementById('subtask_input');
      subtaskInput.blur();
      subtaskInput.value = '';
      let subtaskInputIcon = document.getElementById('subtask_input_icon');
      subtaskInputIcon.innerHTML =
      /*html*/`                              
            <img src="./assets/img/subtask_add.svg" alt="">
      `;
}


function deleteSubtask(i) {
      const subtasks = tasks[taskIndex].subtasks;
      if (i >= 0 && i < subtasks.length) {
            subtasks.splice(i, 1); // Lösche das Subtask-Objekt an der Position i
            renderSubtasks(); // Aktualisiere die Ansicht
      }
      renderSubtasks();
}


function renderSubtasks() {
      let liSubtask = document.getElementById('ul_subtask_task');
      liSubtask.innerHTML = "";
      const subtasks = tasks[taskIndex].subtasks;
      for (let i = 0; i < subtasks.length; i++) {
            const subtaskenktry = tasks[taskIndex].subtasks[i].subtask;
            const counter = tasks[taskIndex].subtasks[i].counter;
            liSubtask.innerHTML += renderSubtasksHtmlTemplate(subtaskenktry, i)

      }
}


function renderSubtasksHtmlTemplate(subtaskentry, i) {
      return /* html */  `
      <li class="li_subtask_task" onmouseenter="showSubtaskEditIcons(${i})" onmouseleave="hideSubtaskEditIcons(${i})" >
            <img src="./assets/img/bulletpoint.svg" alt="" class="bulletpoint">
            <span>${subtaskentry}</span>
            <div class="li_subtask_icon d-none" id="li${i}">
            <img src="./assets/img/delete.svg" alt="" onclick="deleteSubtask(${i})">
            <hr>
            <img src="./assets/img/subtask_edit.svg" alt="">
            </div>
      </li>`
}


function saveSubtaskToArray(subtaskValue) {
      tasks[taskIndex].subtasks.push({
            completed: false,
            subtask: subtaskValue

      });

}


function setToFocus(element) {
      const focusElement = document.getElementById(element);
      focusElement.focus();
}


function validateForm() {
      let title = document.getElementById('input_title')
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
      if (title.value.trim() !== "" && description.value.trim() !== "" && date.value.trim() !== "" && currentPriority !== 0 && category.innerText !== "Select task category") {
            createTask()
      }
}


function removeError(element) {
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


async function createTask() {

      saveFormInputToArray();
      saveTextareaInputToArray();
      saveTheDateToArray();
      setTaskStatus();
      await saveTaskToRemoteStorage();
      await toggleNotification();
      if (window.location.pathname !== '/add-task-page.html') {
            closeAddTaskOverlay();
      }

      jumpToBoard();

}


function setTaskStatus() {
      tasks[taskIndex].status.push(statusVar);
}


function saveFormInputToArray() {
      let input = document.getElementById('input_title')
      let inputValue = input.value;
      tasks[taskIndex].title.push(inputValue);
}


function saveTextareaInputToArray() {
      let input = document.getElementById('textarea_description')
      let inputValue = input.value;
      tasks[taskIndex].description.push(inputValue);
}


function savePriorityToArray(Prio) {
      tasks[taskIndex].priority.splice(0, 1)
      tasks[taskIndex].priority.push(Prio);
}


function saveCategoryToArray(category) {
      tasks[taskIndex].category.splice(0, 1)
      tasks[taskIndex].category.push(category)
}

function saveTheDateToArray() {
      let dueDate = document.getElementById("date-picker").value
      tasks[taskIndex].date.push(dueDate);
}


function closeAccountsInAssignDropdown() {
      let assign = document.getElementById(`assign_list_container`);
      assign.innerHTML = "";
      let category = document.getElementById('category_dropdown');
      category.innerHTML = "";
}


async function saveTaskToRemoteStorage() {
      await setItem('tasks', (JSON.stringify(tasks)))
}


async function deleteTask() {
      tasks.splice(taskIndex, 1)
      document.getElementById('input_title').value = "";
      document.getElementById('textarea_description').value = "";
      document.getElementById('search_accounts_to_assign').value = "";
      document.getElementById('date-picker').value = "";
      document.getElementById('subtask_input').value = "";
      document.getElementById('form_assign_badge').innerHTML = "";
      document.getElementById('category_field_title').innerHTML = "Select task category";
      document.getElementById('ul_subtask_task').innerHTML = "";
      clearPriority();
      addToTasks()
      await saveTaskToRemoteStorage()
}


function clearPriority() {
      let urgent = document.getElementById('urgent');
      let medium = document.getElementById('medium');
      let low = document.getElementById('low');
      urgent.classList.remove("urgent-checked");
      medium.classList.remove("medium-checked");
      low.classList.remove("low-checked");
      urgent.innerHTML = /*html*/ `<p>Urgent</p><img src="./assets/img/Prio_alta.svg" alt="">`;
      medium.innerHTML = /*html*/ `<p>Medium</p><img src="./assets/img/Prio_media.svg" alt="">`;
      low.innerHTML = /*html*/ `<p>Low</p><img src="./assets/img/Prio_baja.svg" alt="">`;
      currentPriority = 0;
}


async function closeAndDeleteAddTask() {
      await deleteTask()
      tasks.splice(taskIndex, 1)
      await saveTaskToRemoteStorage()
      await closeAddTaskOverlay(status);
}


async function openAddTaskPage() {
      statusVar = "to-do-column";
      await initAddTask()
}


async function openAddTaskOverlay(status) {
      let overlay = document.getElementById('add-task-overlay');
      overlay.classList.remove('d-none');
      let template = "add-task.html"
      let elementID = "add-task-overlay-container"
      overlay.innerHTML = getHtmlTemplate(template, elementID);
      statusVar = status;
      await includeHTML();
      addCloseButtonToOverlay();
      await initAddTask()
}


function addCloseButtonToOverlay() {
      document.getElementById('addtask_header').innerHTML += `<img class="pointer"  onclick="closeAndDeleteAddTask()" src="./assets/img/Close.svg" alt=""></img>`
}

async function closeAddTaskOverlay(status) {
      let overlay = document.getElementById('add-task-overlay');
      overlay.classList.add('d-none');
      overlay.innerHTML = "";
      statusVar = status;
      await initRenderAllTasksOnKanban();

}


async function deleteTasksFromRemoteStorage() {
      tasks = [];
      await saveTaskToRemoteStorage()
}


function toggleNotification() {
      return new Promise((resolve) => {
            const notificationElement = document.querySelector('.add-task-success');
            // Meldung einblenden
            notificationElement.classList.add('add-task-opak');

            // Warte die Zeit des Einblendens plus 2 Sekunden Sichtbarkeit
            setTimeout(() => {
                  // Meldung ausblenden
                  notificationElement.classList.remove('add-task-opak');

                  // Weitere 0.5 Sekunden warten, um das Ausblenden abzuschließen
                  setTimeout(resolve, 500);
            }, 2500); // 2000 Millisekunden für das Sichtbarsein
      });
}

function jumpToBoard() {
      if (window.location.pathname === '/add-task-page.html') {
            window.location.href = '/board.html';
      }
}