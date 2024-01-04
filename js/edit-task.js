
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
      loadCategoryInEditTask(taskID)
      

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

function loadCategoryInEditTask(taskID){
  let container = document.getElementById('edit-task-container');
  let task = tasks[taskID].category;
  container.innerHTML = /*html*/`
                        <div class="category_container">
                        <div class="category_label">
                              <h4>Category<span class="required">*</span></h4>
                        </div>

                        <div class="category_field_dropdown_container pointer" id="category_field_dropdown_container">
                              <div class="category_field" onclick="toggleCategoryDropdown()">
                                    <p id="category_field_title" class="category_field_title">${task}</p>
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