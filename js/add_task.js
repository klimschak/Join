


function displayAccountsInAssignDropdown() {
      let assign = document.getElementById(`assign_list`);
      assign.innerHTML = "";
      for (let i = 0; i < accounts.length; i++) {
            assign.innerHTML += /*html*/`
            <li id="assignaccount${i}" onclick="assignAccountToTask(${i}), checkIfAssigned(${i})"><div class="form_assign_badge">${accounts[i]['initials']}</div><div class="form_assign_name">${accounts[i]['name']}</div><img id="assigncheck${i}" src="./assets/img/checkbutton_default.svg" alt=""></li>
            `;
            

      }
}

function checkIfAssigned(i){
      document.getElementById(`assigncheck${i}`).src = './assets/img/checkbutton_checked.svg';

}

function assignAccountToTask(i) {
      const accountId = accounts[i]['id'];
      const assignedIds = tasks[0]['id'];

      if (!assignedIds.includes(accountId)) {
            tasks[0]['assigned'].push(accounts[i]['name']);
            tasks[0]['id'].push(accountId);
      } else {
            alert('Die ID ist bereits zugewiesen.');
      }
}
