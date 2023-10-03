const selectedContacts = document.getElementById('selected-contacts');
const dropdownButton = document.getElementById('dropdown-button');
const contactList = document.getElementById('contact-list');
const contacts = document.querySelectorAll('.contact-list li');

let selectedContactIds = [];

function updateSelectedContacts() {
    selectedContacts.innerHTML = selectedContactIds.map(id => {
        const contact = document.querySelector(`.contact-list li[data-id="${id}"]`);
        return contact.textContent;
    }).join(', ');
}

function toggleContactSelection(id) {
    const index = selectedContactIds.indexOf(id);
    if (index === -1) {
        selectedContactIds.push(id);
    } else {
        selectedContactIds.splice(index, 1);
    }
    updateSelectedContacts();
}

dropdownButton.addEventListener('click', () => {
    contactList.style.display = contactList.style.display === 'block' ? 'none' : 'block';
});

contacts.forEach(contact => {
    contact.addEventListener('click', () => {
        const id = contact.getAttribute('data-id');
        toggleContactSelection(id);
        contact.classList.toggle('selected');
    });
});
