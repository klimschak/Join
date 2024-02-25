const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get("msg");
if (msg) {
  msg.innerHTML = msg;
}

function login() {
  let email = document.getElementById("emailLogIn");
  let password = document.getElementById("passwordLogIn");

  // Lade die Benutzerdaten aus dem Local Storage
  loadUsers();

  // Warte auf das Laden der Benutzerdaten und suche dann nach dem Benutzer
  setTimeout(() => {
    let user = users.find(
      (u) => u.email == email.value && u.password == password.value
    );
    console.log(user);
    if (user) {
      console.log("User Gefunden");
      window.location.href = "board.html";
    } else {
      alert("Nicht gefunden");
    }
  }, 1000); // Warte 1 Sekunde (Anpassung je nach Ladezeit)
}

function goToSignUp() {
  window.location.href = "signup.html";
}


function animateLogo(){
  const logo = document.getElementById('start-logo');
  const bg = document.getElementById('start-background');
  logo.classList.add('small');
  bg.classList.add('opak')
}



