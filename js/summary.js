let urgentCount = 0;
let taskCount = 0;
let toDoCount = 0;
let inProgressCount = 0;
let doneCount = 0;
let awaitCount = 0;
let earliestDate = null;

async function loadSummaryCount() {
      await loadTaskFromRemoteStorage()
      countUrgent();
      countTasks();
      countToDo();
      findEarliestDate()
      
      console.log('Anzahl Urgen:', urgentCount);
      console.log('Anzahl Tasks:', taskCount);
      console.log('Anzahl ToDos:', toDoCount);
      console.log('Anzahl In Progress:', inProgressCount);
      console.log('Anzahl In Done:', doneCount);
      console.log('Anzahl In await:', awaitCount);
      console.log('Frühestes Datum:', earliestDate);
      placeDataInSummaryPage();
}

function countUrgent() {
      for (let i = 0; i < tasks.length; i++) {
            let priority = tasks[i].priority
            if (priority == 'Urgent') {
                  urgentCount++
            }
      }
  }
  
  function countTasks() {
      for (let i = 0; i < tasks.length; i++) {
            taskCount++
      }
  }
  
  function countToDo() {
      for (let i = 0; i < tasks.length; i++) {
            let status = tasks[i].status
            if (status == 'to-do-column') {
                  toDoCount++
            }
            if (status == 'in-progress-column') {
                  inProgressCount++
            }
            if (status == 'done-column') {
                  doneCount++
            }
            if (status == 'await-feedback-column') {
                  awaitCount++
            }
      }
  }


  function findEarliestDate() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].date.length > 0) {
              const currentDate = new Date(tasks[i].date);
              currentDate.setHours(0, 0, 0, 0);
  
              if (currentDate >= today && (earliestDate === null || currentDate < earliestDate)) {
                  earliestDate = currentDate;
              }
          }
      }
  
      if (earliestDate) {
          // Konvertiere earliestDate in das Format "February 24, 2024"
          earliestDate = earliestDate.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
          });
      } else {
          earliestDate = 'Kein zukünftiges Datum vorhanden';
      }
  }
  
  function placeDataInSummaryPage() {
      document.getElementById('summary-to-do').innerHTML = toDoCount;
      document.getElementById('summary-done').innerHTML = doneCount;
      document.getElementById('summary-urgency').innerHTML = urgentCount;
      document.getElementById('summary-date').innerHTML = earliestDate;
      document.getElementById('summary-tasks').innerHTML = taskCount;
      document.getElementById('summary-progress').innerHTML = inProgressCount;
      document.getElementById('summary-feedback').innerHTML = awaitCount;

  }