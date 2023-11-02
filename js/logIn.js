import { users } from "./register";


const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
if(msg) {
    msg.innerHTML = msg;
} 

function logIn() {
    let email = document.getElementById('emailLogIn');
    let password = document.getElementById('passwordLogIn');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    console.log(user);
    if(user) {
        console.log('User Gefunden')
    }
}