let users = [];

async function init() {
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
  username.value = "";
  email.value = "";
  password.value = "";
  registerBtn.disabled = false;
}

export { users};