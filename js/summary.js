let urgentCount = 0;
let taskCount = 0;
let toDoCount = 0;
let inProgressCount = 0;
let doneCount = 0;
let awaitCount = 0;
let earliestDate = null;

async function loadTaskFromRemoteStorage() {
    tasks = JSON.parse(await getItem('tasks'));
}


async function loadSummaryCount() {
    await loadTaskFromRemoteStorage()
    await loadLoginData()
    await loadUsers()
    putInitialInTopBar()

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
    setGreetMessage()
    greetedUser()
    checkWidthAndTrigger()

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

function setGreetMessage() {
    let container = document.getElementById('greet');
    let now = new Date();
    let hour = now.getHours();
    if (hour >= 6 && hour < 12) { // 6:00 - 11:59 Morning
        container.innerHTML = 'Good Morning';
    } else if (hour >= 12 && hour < 17) { // 12:00 - 16:59 Afternoon
        container.innerHTML = 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) { // 17:00 - 20:59 Evening
        container.innerHTML = 'Good Evening';
    } else { // 21:00 - 5:59 Night
        container.innerHTML = 'Good Night';
    }
}

function setGreetMessageMobile() {
    let now = new Date();
    let hour = now.getHours();
    let time;
    if (hour >= 6 && hour < 12) { // 6:00 - 11:59 Morning
        time = 'Good Morning';
    } else if (hour >= 12 && hour < 17) { // 12:00 - 16:59 Afternoon
        time = 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) { // 17:00 - 20:59 Evening
        time = 'Good Evening';
    } else { // 21:00 - 5:59 Night
        time = 'Good Night';
    }
    return time
}


function greetedUser() {
    let container = document.getElementById('summary-user');
    if (loggedInUser != "Guest") {
        container.innerHTML = loggedInUser;
    }
    if (loggedInUser == "Guest") {
        container.innerHTML = "";
    }
}



function forceRestartAnimation() {
    const bg = document.getElementById('start-background');
    bg.classList.remove('opak'); // Stelle sicher, dass die Opazität auf 1 gesetzt ist.
    

    // Entferne das Element kurz und füge es erneut hinzu, um die Animation zurückzusetzen
    void bg.offsetWidth; // Trigger reflow
    bg.classList.add('opak'); // Füge die Klasse erneut hinzu, um die Opazität auf 0 zu setzen
    
}

function onWidth1024OrLess() {
    console.log("Die Bildschirmbreite ist 1024px oder weniger.");
    const bg = document.getElementById('start-background');
    let time = setGreetMessageMobile()
    if (loggedInUser == "Guest") {
        bg.innerHTML = /*html*/`<div class="summary-greet">${time}</div>`
    }
    if (loggedInUser != "Guest") {
        bg.innerHTML = /*html*/`<div class="summary-greet">${time}</div><div class="greet-user-mobile">${loggedInUser}</div>`
    }

    bg.classList.remove('d-none');
    forceRestartAnimation(); // Starte die Animation neu, anstatt nur die Klasse zu ändern
}

function onWidthAbove1024() {
    const bg = document.getElementById('start-background');
    bg.classList.add('d-none');
    bg.classList.remove('opak');
}

// Funktion zum Überprüfen der Breite und Ausführen der Zielfunktion
function checkWidthAndTrigger() {
    const currentWidth = window.innerWidth;
    if (currentWidth <= 1024) {
        onWidth1024OrLess();
    } else {
        onWidthAbove1024();
    }
}

// Füge den Event-Listener für das Resize-Event hinzu
window.addEventListener('resize', checkWidthAndTrigger);

// Führe die Überprüfung auch beim ersten Laden der Seite aus
//checkWidthAndTrigger();
