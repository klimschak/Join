let loggedInUser = 0;
let loggedInitials;
const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get("msg");
if (msg) {
    msg.innerHTML = msg;
}

function logout(){
    loggedInUser = "Guest";
    // Berechne die Initialen
    let names = loggedInUser.split(' '); // Trennt den String an Leerzeichen
    loggedInitials = "G";
    localStorage.setItem('loggedInUser', loggedInUser);
    localStorage.setItem('loggedInitials', loggedInitials);
}

async function login() {
    let email = document.getElementById("emailLogIn");
    let password = document.getElementById("passwordLogIn");

    // Lade die Benutzerdaten aus dem Local Storage
    loadUsers();

    // Warte auf das Laden der Benutzerdaten und suche dann nach dem Benutzer
    setTimeout(async () => {
        let user = users.find(
            (u) => u.email == email.value && u.password == password.value
        );
        if (user) {
            await saveLoginData(user);           
            window.location.href = "board.html";  
        } else {
            alert("Nicht gefunden");
        }
        
    }, 1000); // Warte 1 Sekunde (Anpassung je nach Ladezeit)
}

async function saveLoginData(user) {
    loggedInUser = user.username;
    // Berechne die Initialen
    let names = loggedInUser.split(' '); // Trennt den String an Leerzeichen
    let initials = names.map(name => name[0]).join(''); // Nimmt den ersten Buchstaben jedes Namens und verbindet sie
    loggedInitials = initials;
    localStorage.setItem('loggedInUser', loggedInUser);
    localStorage.setItem('loggedInitials', loggedInitials);
}

async function loadLoginData() {
    loggedInUser = localStorage.getItem('loggedInUser');
    loggedInitials = localStorage.getItem('loggedInitials');
}

function goToSignUp() {
    window.location.href = "signup.html";
}


function animateLogo() {
    const logo = document.getElementById('start-logo');
    const bg = document.getElementById('start-background');
    logo.classList.add('small');
    bg.classList.add('opak')
}



