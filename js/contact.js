let userContacts = [
  {
    id: 1,
    name: "Siham El-Maimouni",
    mail: "siham@mail.com",
    initials: "SE",
  },

  {
    id: 2,
    name: "Pedro Göntürk",
    mail: "predro@mail.com",
    initials: "PG",
  },

  {
    id: 3,
    name: "Thorsten Puccini",
    mail: "thorsten.mail.com",
    initials: "TP",
  },

  { id: 4, name: "John Doe", mail: "john.doe@example.com", initials: "JD" },
];

document.addEventListener("DOMContentLoaded", function () {
  includeHTML();
});

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

function openContact(event) {
  const contactElement = event.currentTarget;
  const contactId = contactElement.getAttribute("data-contact-id");
  showSelectedContact(contactId);
  changeClassToActive(contactElement);
}

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
