function renderTasksOnKanban(){
  let ToDo = document.getElementById('to-do-column');
  let category = tasks[0].category
  let category_display = category
  if (category == "user-story"){
    category_display = "User Story"
  }
  ToDo.innerHTML = "";
  ToDo.innerHTML = /*html*/`
        <div id="kanban-card" class="kanban-card">

        <div class="kanban-category-${category}">
        ${category_display}
        </div>

        <div class="kanban-title">
              Kochwelt Page & Recipe Recommender
        </div>

        <div class="kanban-description">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr
        </div>

        <div class="kanban-subtask">
              1/2 Subtaks
        </div>

        <div class="kanban-assign-prio-container">
              <div class="kanban-assign-to">

              </div>
              <div class="kanban-prio">

              </div>
        </div>
        </div>
  `
}