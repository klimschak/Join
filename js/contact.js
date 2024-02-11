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

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
  changeClassToActive();
}

async function renderContacts() {
  console.log("Rendering contacts...");
  const contactsContainer = document.getElementById("contacts");
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
    const contactInfo = document.getElementById("contact-info");
    contactInfo.innerHTML = `
      <p class="userName">${contact.name}</p>
      <p class="userMail">${contact.mail}</p>
    `;
  }
}

function changeClassToActive(element) {
  const activeElements = document.getElementsByClassName("active");
  for (let i = 0; i < activeElements.length; i++) {
    activeElements[i].classList.remove("active");
  }
  element.classList.add("active");
}