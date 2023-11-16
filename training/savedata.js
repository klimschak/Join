let allTasks = [];

function addTask(){
      let description = document.getElementById('description').value;
      let category = document.getElementById('category').value;
      let task = {
            'description': description,
            'category': category,
            'createdAt': new Date().getTime()

      };
      
      allTasks.push(task)

      //array wird in strings konvertiert
      let allTasksStringified = JSON.stringify(allTasks);
      //array wird in localstorage gespeichert
      localStorage.setItem('allTasks', allTasksStringified)
      
} 


function loadAllTasks() {
      //Abrufen des Array aus Localstorage
      let allTaskStringified = localStorage.getItem('allTasks')

      //Array aus Localstorage in Array konvertieren
      allTasks = JSON.parse(allTaskStringified);

      console.log('Loaded all tasks', allTasks)
}