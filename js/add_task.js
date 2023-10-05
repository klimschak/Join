function displayAccountsInAssignDropdown() {
      let assign = document.getElementById(`assign_list`);
      assign.innerHTML = "";

      for (let i = 0; i < accounts.length; i++) {
            const accountId = accounts[i]['id'];
            const assignedIds = tasks[0]['id'];
            setStateOfAccountInAssignDropdown (assign, i, accountId, assignedIds);
      }
}

function setStateOfAccountInAssignDropdown (assign, i, accountId, assignedIds){
      if (!assignedIds.includes(accountId)) { //Falls dem Account i der Task NICHT zugeordnet wurde, soll dies ausgeführt werden
            assign.innerHTML += /*html*/`
            <li id="assignaccount${i}" onclick="checkIfAssigned(${i})"><div class="form_assign_badge">${accounts[i]['initials']}</div><div class="form_assign_name">${accounts[i]['name']}</div><img id="assigncheck${i}" src="./assets/img/checkbutton_default.svg" alt=""></li>
            `;
      }
      if (assignedIds.includes(accountId)) { //Falls dem Account i der Task zugeordnet wurde, soll dies ausgeführt werden
            assign.innerHTML += /*html*/`
            <li id="assignaccount${i}" onclick="checkIfAssigned(${i})"><div class="form_assign_badge">${accounts[i]['initials']}</div><div class="form_assign_name">${accounts[i]['name']}</div><img id="assigncheck${i}" src="./assets/img/checkbutton_checked.svg" alt=""></li>
            `;
      }
}

function closeAccountsinAssignDropdown() {
      let assign = document.getElementById(`assign_list`);
      assign.innerHTML = "";
}

function checkIfAssigned(i) {
      const accountId = accounts[i]['id'];
      const assignedIds = tasks[0]['id'];
      const accountName = `${accounts[i]['name']}`;
      const index = tasks[0]['assigned'].indexOf(accountName);
      let badge = document.getElementById('form_assign_badge')
      let assignbadge = document.getElementById(`assign_badge${i}`);
      
      ifAccountIsNotAssigned (i,accountId, assignedIds, badge)
      ifAccountIsAssigned (i, index, assignbadge)
            
}

function ifAccountIsNotAssigned (i, accountId, assignedIds , badge){
      if (!assignedIds.includes(accountId)) {
            tasks[0]['assigned'].push(accounts[i]['name']);
            tasks[0]['id'].push(accountId);
            document.getElementById(`assigncheck${i}`).src = './assets/img/checkbutton_checked.svg';
            badge.innerHTML += /*html*/`
                  <div id="assign_badge${i}" class="form_assign_badge">${accounts[i]['initials']}</div>
                  `
      }
}

function  ifAccountIsAssigned (i, index, assignbadge) {
      if (index !== -1) {
            tasks[0]['assigned'].splice(index, 1);
            tasks[0]['id'].splice(index, 1);
            document.getElementById(`assigncheck${i}`).src = './assets/img/checkbutton_default.svg';
            assignbadge.remove();
      }
}