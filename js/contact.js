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
];

document.addEventListener("DOMContentLoaded", function() {
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
          <p class="userInitials">${contact.initials}</p>
          <div class="userCase">
            <p class="userName">${contact.name}</p>
            <p class="userMail">${contact.mail}</p>
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
  // Find the selected contact
  const contact = userContacts.find((c) => c.id === parseInt(contactId));
  if (contact) {
    // Show the contact details
    const contactInfo = document.getElementById("contact-details");
    if (!contactInfo) {
      console.error("Contact info container not found!");
      return;
    }
    contactInfo.innerHTML = `
      <p class="userName">${contact.name}</p>
      <p class="userMail">${contact.mail}</p>
    `;
    contactInfo.classList.add("show");
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