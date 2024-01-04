
// Die Funktion übernimmt die TaskID mit der das dazugehörige Array angesteuert werden kann
// Die Funktion bildet den Start, um Tasks zu editieren
async function loadTaskEdit(taskID) {
      let overlay = document.getElementById('edit-task-overlay');
      overlay.classList.remove('d-none');
      document.getElementById('task-overview-overlay').classList.add('d-none')
      //addEventlistenerToSubtaskField ()
      console.log('Task ID:', taskID);
      task = tasks[taskID];

    }

// Funktion die die einzelnen Formularelemente rendert
// Zuerst sollen die Formularelemente im Iniitalzustand erstellt werden
// Funktion die die einzelnen Formularelemente mit den Inhalten aus dem Array befüllt
