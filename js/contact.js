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
          <div>
          <p>Initials: ${contact.initials}</p>
          <div>
            <p>Name: ${contact.name}</p>
            <p>Mail: ${contact.mail}</p>
          </div>
          </div>
        `;
    }
  } else {
    contactsContainer.innerHTML = "Keine Kontakte gefunden.";
  }
}
