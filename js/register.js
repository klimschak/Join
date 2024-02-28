let users = [];

async function init() {
    console.log("Initializing...");
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem("users"));
    } catch (e) {
        console.error("Loading error:", e);
    }
}

async function register() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    let privacyPolicyCheckbox = document.getElementById("privacyPolicy").checked; // ID der Checkbox hinzugefügt
    let registerBtn = document.getElementById("registerBtn");

    registerBtn.disabled = true; // Deaktiviere den Registrierungsbutton, um Mehrfachklicks zu verhindern.

    // Überprüfe, ob die beiden Passwörter übereinstimmen.
    if (password !== password2) {
        alert("Die Passwörter stimmen nicht überein.");
        registerBtn.disabled = false; // Aktiviere den Button wieder, falls die Passwörter nicht übereinstimmen.
        return; // Verlasse die Funktion, um die Registrierung zu stoppen.
    }

    // Überprüfe, ob die Datenschutzrichtlinie akzeptiert wurde.
    if (!privacyPolicyCheckbox) {
        alert("Bitte akzeptieren Sie die Datenschutzrichtlinie.");
        registerBtn.disabled = false; // Aktiviere den Button wieder, falls die Richtlinie nicht akzeptiert wurde.
        return; // Verlasse die Funktion, um die Registrierung zu stoppen.
    }

    // Füge den neuen Benutzer hinzu, wenn die Passwörter übereinstimmen und die Datenschutzrichtlinie akzeptiert wurde.
    users.push({username: username, email: email, password: password});

    try {
        await setItem("users", JSON.stringify(users)); // Speichere die aktualisierte Benutzerliste.
        resetForm(); // Setze das Formular zurück.
        window.location.href = 'index.html?msg=Erfolgreich Registriert'; // Weiterleitung mit Erfolgsmeldung.
    } catch (e) {
        console.error("Registration error:", e); // Logge Fehler bei der Registrierung.
        registerBtn.disabled = false; // Aktiviere den Button wieder, im Fehlerfall.
    }
}

function resetForm() {
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password2").value = "";
    document.getElementById("privacyPolicy").checked = false; // Setze die Checkbox zurück.
    document.getElementById("registerBtn").disabled = false; // Aktiviere den Button wieder.
}
