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
  let registerBtn = document.getElementById("registerBtn");
  registerBtn.disabled = true;
  users.push({
    username: username.value,
    email: email.value,
    password: password.value,
  });
  await setItem("users", JSON.stringify(users));
  resetForm();
  window.location.href = 'index.html?msg=Erfolgreich Registriert';
}

function resetForm() {
  let registerBtn = document.getElementById("registerBtn");
  username.value = "";
  email.value = "";
  password.value = "";
  registerBtn.disabled = false;
}