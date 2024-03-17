/**
 * Represents a collection of user contacts.
 *
 * @typedef {Object[]} UserContact[]
 * @property {number} id - The unique identifier of the user contact.
 * @property {string} name - The full name of the user contact.
 * @property {string} mail - The email address of the user contact.
 * @property {string} initials - The initials of the user contact.
 */
let userContacts = [];

document.addEventListener("DOMContentLoaded", function () {
    includeHTML();
});

/**
 * Fetches HTML content from a specified file and includes it in the current document.
 * If the fetch is successful, the fetched content will be inserted into elements with the attribute 'w3-include-html'.
 *
 * @return {Promise<void>} A Promise that resolves once all include elements have been processed.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll("[w3-include-html]");
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
            changeClassToActive(element); // Pass the element argument here
        } else {
            element.innerHTML = "Page not found";
        }
    }
}

/**
 * Renders the contacts on the page.
 *
 * @async
 * @function renderContacts
 * @returns {void}
 */
async function renderContacts() {
    console.log("Rendering contacts...");
    const contactsContainer = document.getElementById("contacts");
    if (!contactsContainer) {
        console.error("Contacts container not found!");
        return;
    }
    contactsContainer.innerHTML = "";

    // Überprüfen Sie, ob userContacts vorhanden sind
    if (userContacts && userContacts.length > 0) {
        for (let i = 0; i < userContacts.length; i++) {
            const contact = userContacts[i];

            // Beispielhaftes HTML für die Darstellung der Kontakte
            contactsContainer.innerHTML += `
          <div class="userMainCase" data-contact-id="${contact.id}" onclick="openContact(event)">
          <span class="userInitials">${contact.initials}</span>
          <div class="userCase">
            <span class="userName">${contact.name}</span>
            <span class="userMail">${contact.mail}</span>
          </div>
          </div>
        `;
        }

        const contactDetailsContainer = document.getElementById("contact-details");
        if (!contactDetailsContainer) {
            console.error("Contact details container not found!");
            return;
        }
        contactDetailsContainer.innerHTML = "";
    } else {
        contactsContainer.innerHTML = "Keine Kontakte gefunden.";
    }

    
}

async function onLoadContacts(){
    await copyUsersToAccounts();
}

/**
 * Opens a contact when clicked.
 *
 * @param {Event} event - The event triggered when the contact is clicked.
 * @returns {void}
 */
function openContact(event) {
    const contactElement = event.currentTarget;
    const contactId = contactElement.getAttribute("data-contact-id");
    showSelectedContact(contactId);
    changeClassToActive(contactElement);
}

/**
 * Display the details of a selected contact.
 *
 * @param {number} contactId - The ID of the contact to display.
 *
 * @return {void} - This method does not return any value.
 */
function showSelectedContact(contactId) {
    const contact = userContacts.find((c) => c.id === parseInt(contactId));
    if (contact) {
        const contactDetailsContainer = document.getElementById("contact-details");
        contactDetailsContainer.innerHTML = /*html*/ `
      
    
      <div class="contact-info">
      <div class="contact-headline">
        <span class="contact-Titel-Open">Contacts</span>
        <img
        class="contact-Titel-Mid"
        src="assets/img/contactTitelMid.svg"
      />
        <span class="contact-Titel-team">Better with a team</span>
        </div>
        <div class="contact-Open-Info">
        <span class="contact-Open-Initials">${contact.initials}</span>
        <span class="contact-name">${contact.name}</span>

        <div class="contact-Titel-Edit-Delete">
        <div class="contact-edit">
        <img
        class="contact-Titel-edit-img"
        src="assets/img/contactEdit.svg"
      />
      <span class="contact-Titel-edit-text"> Edit </span>
      </div>

      <div class="contact-delete">
      <img
      class="contact-Titel-delete-img"
      src="assets/img/contactDelete.svg"
    />
      <span class="contact-Titel-delete-text">Delete</span>
       </div>
        </div>
          </div>
        <div class="contact-Titel-contactInformation">
          <span class="contact-Titel-contactInformation-text">Contact Information</span>
          </div>
          <div class="contact-Titel-phoneEmailAddresses">
        <span class="contact-mail">${contact.mail}</span>
      </div>
      </div>
    `;
        contactDetailsContainer.classList.add("show");
    }
}

/**
 * Changes the CSS class of an element to "active" and removes the "active" class from all other elements.
 *
 * @param {HTMLElement} element - The element whose class is to be changed to "active".
 *
 * @returns {void}
 * @throws {Error} If element is not defined.
 */
function changeClassToActive(element) {
    if (!element) {
        console.error("Element is not defined!");
        return;
    }
    const activeElements = document.getElementsByClassName("active");
    for (let i = 0; i < activeElements.length; i++) {
        activeElements[i].classList.remove("active");
    }
    element.classList.add("active");
}

/**
 * Shows the new contact form.
 *
 * @return {void}
 */
function addNewContact() {
    document.getElementById("newContactForm").style.display = "flex"; // Ändern Sie "none" zu "flex", um das Formular anzuzeigen
}

/**
 * Hides the specified form.
 *
 * @param {string} formId - The ID of the form element to be hidden.
 */
function closeForm() {
    document.getElementById("newContactForm").style.display = "none"; // Versteckt das Formular wieder
}

/**
 * Saves a new contact to the user contacts list.
 *
 * @returns {void}
 */
function saveNewContact() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const initials = document.getElementById("initials").value;

    // Erstellen eines neuen Kontaktobjekts
    const newContact = {
        id: userContacts.length + 1, // Einfache Methode zur ID-Erzeugung
        name: name, mail: email, initials: initials,
    };

    // Hinzufügen des neuen Kontakts zum Array
    userContacts.push(newContact);

    // Kontakte im Local Storage speichern
    localStorage.setItem('userContacts', JSON.stringify(userContacts));

    // Formular verstecken und Felder leeren
    document.getElementById("newContactForm").style.display = "none";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("initials").value = "";

    // Kontaktliste neu rendern
    renderContacts();
}


/**
 * Load contacts from local storage and render them on the contact list if available.
 * @function loadContacts
 * @returns {void}
 */
function loadContacts() {
    // Prüfen, ob Kontakte im Local Storage gespeichert sind
    const storedContacts = localStorage.getItem('userContacts');
    if (storedContacts) {
        userContacts = JSON.parse(storedContacts); // Konvertiert den String zurück in ein Array
        renderContacts(); // Kontaktliste mit den geladenen Kontakten rendern
    }
}


async function loadContactsOnAddTask(){
    const storedContacts = localStorage.getItem('userContacts');
    if (storedContacts) {
        userContacts = JSON.parse(storedContacts); // Konvertiert den String zurück in ein Array
    }
}